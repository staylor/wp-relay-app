import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import Helmet from 'react-helmet';
import { css } from 'glamor';
import RefetchContainer from 'decorators/RefetchContainer';
import SearchQuery from 'queries/Search';
import Archive from 'components/Archive';
import { SITE_URL } from 'utils/constants';
import SearchBox from './Box';
import styles from './styles';

@RefetchContainer(
  graphql`
    fragment Search_viewer on Viewer {
      posts(search: $search, first: $count) @connection(key: "Search_posts") {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
    }
  `,
  SearchQuery
)
export default class Search extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      tag: PropTypes.object,
      posts: PropTypes.object,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    relay: PropTypes.object.isRequired,
  };

  state = {
    fetching: false,
  };

  term = null;
  count = 10;

  loadMore() {
    this.count += 10;
    this.props.relay.refetch(
      {
        search: this.term,
        count: this.count,
      },
      null,
      e => {
        if (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    );
  }

  onSetTerm(term) {
    this.setState({ fetching: true });
    this.count = 10;
    this.term = term;
  }

  onRefetch() {
    this.setState({ fetching: false });
  }

  render() {
    const { viewer: { posts = null }, relay } = this.props;
    const showPosts = posts && !this.state.fetching;

    return (
      <div className={css(styles.sections)}>
        <Helmet>
          <title>Search Results</title>
          <link rel="canonical" href={`${SITE_URL}/search`} />
        </Helmet>
        <SearchBox
          relay={relay}
          pageInfo={posts && posts.pageInfo}
          onSetTerm={term => this.onSetTerm(term)}
          onRefetch={e => this.onRefetch(e)}
        />
        {showPosts && [
          <Archive key="archive" posts={posts} />,
          posts.pageInfo.hasNextPage &&
            <button key="button" className={css(styles.button)} onClick={() => this.loadMore()}>
              MORE
            </button>,
        ]}
      </div>
    );
  }
}
