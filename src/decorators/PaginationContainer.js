import { createPaginationContainer } from 'react-relay';

export default (fragments, connectionConfig) => Component =>
  createPaginationContainer(
    Component,
    fragments,
    Object.assign(
      {},
      {
        direction: 'forward',
        getConnectionFromProps(props) {
          return props.viewer && props.viewer.posts;
        },
        getVariables(props, { count, cursor }, fragmentVariables) {
          return {
            ...fragmentVariables,
            count,
            cursor,
          };
        },
        getFragmentVariables(vars, totalCount) {
          return {
            ...vars,
            count: totalCount,
          };
        },
      },
      connectionConfig
    )
  );
