import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../relay/environment';

export default query => (ComposedComponent) => {
  const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  return class extends Component {
    static displayName = `GraphQL(${displayName})`;

    render() {
      return (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={this.props}
          render={({ error, props }) => {
            if (error || !props) {
              return null;
            }

            return <ComposedComponent {...props} />;
          }}
        />
      );
    }
  };
};
