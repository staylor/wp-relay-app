import { createPaginationContainer } from 'react-relay';

export default (query, fragment) => Component => createPaginationContainer(
  Component,
  fragment,
  {
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }) {
      return {
        ...props,
        count,
        cursor,
      };
    },
    query,
  }
);
