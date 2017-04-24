import React from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { QueryRenderer } from 'react-relay';
import environment from '../relay/environment';

/* eslint-disable react/prop-types */

export default ({ render, query, variables = {} }) => {
  // QueryRenderer is not isomorphic
  if (!canUseDOM) {
    return null;
  }

  const renderData = ({ error, props }) => {
    if (error || !props) {
      return null;
    }

    return render({ error, props });
  };

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={renderData}
    />
  );
};
