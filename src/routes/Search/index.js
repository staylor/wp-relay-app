// @flow
import React, { Component } from 'react';
import { graphql } from 'react-relay';
import Helmet from 'react-helmet';
import { ContentWrapper } from 'wp-styled-components';
import { LoadMore } from 'wp-styled-components/lib/Archive';
import RefetchContainer from 'decorators/RefetchContainer';
import SearchQuery from 'queries/Search';
import Archive from 'containers/Archive';
import { SITE_URL } from 'utils/constants';
import type { SearchProps } from 'wp-relay-app';
import SearchBox from './Box';

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
  props: SearchProps;

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

  onSetTerm(term: string) {
    this.setState({ fetching: true });
    this.count = 10;
    this.term = term;
  }

  onRefetch() {
    this.setState({ fetching: false });
  }

  render() {
    const { viewer: { posts = {} }, relay } = this.props;
    const showPosts = posts && !this.state.fetching;

    return (
      <ContentWrapper>
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
            <LoadMore key="button" onClick={() => this.loadMore()}>
              MORE
            </LoadMore>,
        ]}
      </ContentWrapper>
    );
  }
}
