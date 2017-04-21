import React from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../relay/environment';

export default query => (ComposedComponent) => {
  const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  const GraphQL = props => (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={props}
      render={({ error, props: renderProps }) => {
        if (error || !renderProps) {
          return null;
        }

        return <ComposedComponent {...renderProps} />;
      }}
    />
  );
  GraphQL.displayName = `GraphQL(${displayName})`;

  return GraphQL;
};
