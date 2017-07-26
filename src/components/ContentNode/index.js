import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Element from './Element';
import Embed from './Embed';

/* eslint-disable react/prop-types, react/forbid-prop-types */

@FragmentContainer(graphql`
  fragment ContentNode_content on ContentNode @relay(plural: true) {
    __typename
    ... on Embed {
      ...Embed_node
    }
    ... on Text {
      text
    }
    ... on Element {
      ...Element_node
      children {
        __typename
        ... on Embed {
          ...Embed_node
        }
        ... on Text {
          text
        }
        ... on Element {
          ...Element_node
          children {
            __typename
            ... on Embed {
              ...Embed_node
            }
            ... on Text {
              text
            }
            ... on Element {
              ...Element_node
              children {
                __typename
                ... on Embed {
                  ...Embed_node
                }
                ... on Text {
                  text
                }
                ... on Element {
                  ...Element_node
                  children {
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
                }
              }
            }
          }
        }
      }
    }
  }
`)
export default class ContentNode extends Component {
  static propTypes = {
    content: PropTypes.array.isRequired,
    component: PropTypes.any.isRequired,
    onEmbedClick: PropTypes.func,
  };

  static defaultProps = {
    onEmbedClick: null,
  };

  parseNodes(nodes) {
    let iterator = 0;
    return nodes.map(node => {
      iterator += 1;
      const key = `key-${iterator}`;
      if (node.__typename === 'Text') {
        return node.text;
      }
      if (node.__typename === 'Embed') {
        return (
          <Embed
            key={key}
            node={node}
            onEmbedClick={this.props.onEmbedClick}
            styles={this.props.styles}
          />
        );
      }
      return this.parseElement(node, key);
    });
  }

  parseElement(node, key) {
    const props = { node, key };
    props.children = null;
    if (node.children) {
      const children = this.parseNodes(node.children);
      if (node.tagName === 'script' || node.tagName === 'style') {
        props.dangerouslySetInnerHTML = { __html: children.join('') };
      } else {
        props.children = children;
      }
    }

    return <Element {...props} />;
  }

  render() {
    const {
      component: ContentComponent,
      content: data,
      onEmbedClick,
      styles,
      relay,
      // only pass extra props
      ...rest
    } = this.props;

    return (
      <ContentComponent {...rest}>
        {this.parseNodes(data)}
      </ContentComponent>
    );
  }
}
