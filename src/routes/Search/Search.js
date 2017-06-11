import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import Helmet from 'react-helmet';
import RefetchContainer from 'decorators/RefetchContainer';
import SearchQuery from 'queries/Search';
import Archive from 'components/Archive';
import SearchBox from './Box';
import styles from './Search.scss';

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

  term = null;
  count = 10;

  loadMore() {
    this.count += 10;
    this.props.relay.refetch(
      {
        search: this.term,
        count: this.count,
      },
      null
    );
  }

  onSetTerm(term) {
    this.count = 10;
    this.term = term;
  }

  render() {
    const { viewer: { posts = null }, relay } = this.props;
    return (
      <div className={styles.sections}>
        <Helmet>
          <title>Search Results</title>
          <link rel="canonical" href={`https://highforthis.com/search`} />
        </Helmet>
        <section>
          <SearchBox
            relay={relay}
            pageInfo={posts && posts.pageInfo}
            onSetTerm={term => this.onSetTerm(term)}
          />
          {posts && <Archive posts={posts} />}
          {posts &&
            posts.pageInfo.hasNextPage &&
            <button className={styles.button} onClick={() => this.loadMore()}>
              MORE
            </button>}
        </section>
      </div>
    );
  }
}
