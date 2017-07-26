import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';
import styles from './styles';

@FragmentContainer(graphql`
  fragment Content_content on ContentNode @relay(plural: true) {
    ... on Text {
      text
    }
    ... on Element {
      tagName
      attributes {
        name
        value
      }
      children {
        ... on Text {
          text
        }
        ... on Element {
          tagName
          attributes {
            name
            value
          }
          children {
            ... on Text {
              text
            }
            ... on Element {
              tagName
              attributes {
                name
                value
              }
              children {
                ... on Text {
                  text
                }
                ... on Element {
                  tagName
                  attributes {
                    name
                    value
                  }
                  children {
                    ... on Text {
                      text
                    }
                    ... on Element {
                      tagName
                      attributes {
                        name
                        value
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
`)
export default class Content extends Component {
  static propTypes = {
    // eslint-disable-next-line
    content: PropTypes.array.isRequired,
    onEmbedClick: PropTypes.func,
  };

  static defaultProps = {
    onEmbedClick: null,
  };

  i = 0;

  parseChildren(children) {
    return children.map(node => node.text || this.parseElement(node));
  }

  parseElement(node) {
    const props = (node.attributes || []).reduce((memo, { name, value }) => {
      if (name === 'class') {
        if (value === 'embed' && this.props.onEmbedClick) {
          memo.onClick = this.props.onEmbedClick;
        }
        memo.className = styles[value] ? css(styles[value]) : value;
      } else {
        memo[name] = value;
      }
      return memo;
    }, {});

    this.i += 1;
    props.key = `key-${this.i}`;

    let children = null;
    if (node.children) {
      if (node.tagName === 'script' && props.type === 'application/json') {
        const json = node.children.reduce((memo, textNode) => (memo += textNode.text), '');
        props.dangerouslySetInnerHTML = { __html: json };
      } else {
        children = this.parseChildren(node.children);
      }
    }

    return React.createElement(node.tagName, props, children);
  }

  render() {
    const data = this.props.content;

    return (
      <section>
        {data.map(node => node.text || (node.tagName && this.parseElement(node)))}
      </section>
    );
  }
}
