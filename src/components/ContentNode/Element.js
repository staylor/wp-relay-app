import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { css } from 'glamor';

export default createFragmentContainer(
  ({ node, children }) => {
    const props = (node.attributes || []).reduce((memo, { name, value }) => {
      if (name === 'class' && this.props.styles) {
        memo.className = this.props.styles[value] ? css(this.props.styles[value]) : value;
      } else {
        memo[name] = value;
      }
      return memo;
    }, {});

    return React.createElement(node.tagName, props, children);
  },
  graphql`
    fragment Element_node on Element {
      tagName
      attributes {
        name
        value
      }
    }
  `
);
