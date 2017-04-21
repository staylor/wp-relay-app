import { createPaginationContainer } from 'react-relay';
import GraphQL from 'decorators/GraphQL';

export default (
  initialQuery,
  pagedQuery,
  fragments
) => Component => (
  GraphQL(initialQuery)(createPaginationContainer(
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
  ))
);
