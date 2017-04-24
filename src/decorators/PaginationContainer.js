import { createPaginationContainer } from 'react-relay';

export default (
  pagedQuery,
  fragments
) => Component => (
  createPaginationContainer(
    Component,
    fragments,
    {
      direction: 'forward',
      getConnectionFromProps: props => props.posts && props.posts.results,
      getFragmentVariables(prevVars, totalCount) {
        return {
          ...prevVars,
          count: totalCount,
        };
      },
      getVariables(props, { count, cursor }) {
        return {
          count,
          after: cursor,
        };
      },
      query: pagedQuery,
    }
  )
);
