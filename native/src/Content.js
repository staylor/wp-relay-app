import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { View, Text } from 'react-native';
import Element from './Element';
import Embed from './Embed';

/* eslint-disable react/prop-types, react/forbid-prop-types */

export const dataFragment = graphql`
  fragment Content_content_data on ContentNode {
    __typename
    ... on Embed {
      ...Embed_node
    }
    ... on Text {
      text
    }
    ... on Element {
      ...Element_node
    }
  }
`;

class Content extends Component {
  parseNodes(nodes, topLevel = false) {
    let iterator = 0;
    return nodes.map(node => {
      iterator += 1;
      const key = `key-${iterator}`;
      if (node.__typename === 'Text') {
        return (
          <Text key={key} style={{ fontSize: 20 }}>
            {node.text}
          </Text>
        );
      }
      if (node.__typename === 'Embed') {
        return <Embed key={key} node={node} />;
      }
      return this.parseElement(node, key, topLevel);
    });
  }

  parseElement(node, key, topLevel = false) {
    const props = { node, key, topLevel };
    props.children = null;
    if (node.children) {
      const children = this.parseNodes(node.children);
      if (node.tagName === 'script' || node.tagName === 'style') {
        return null;
      }
      props.children = children;
    }

    return <Element {...props} />;
  }

  render() {
    const {
      content,
      // only pass extra props
      ...rest
    } = this.props;

    return (
      <View {...rest}>
        {this.parseNodes(content, true)}
      </View>
    );
  }
}

export default createFragmentContainer(
  Content,
  graphql`
    fragment Content_content on ContentNode @relay(plural: true) {
      ...Content_content_data @inline
      ... on Element {
        children {
          ...Content_content_data @inline
          ... on Element {
            children {
              ...Content_content_data @inline
              ... on Element {
                children {
                  ...Content_content_data @inline
                  ... on Element {
                    children {
                      ...Content_content_data @inline
                      ... on Element {
                        children {
                          ...Content_content_data @inline
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
);
