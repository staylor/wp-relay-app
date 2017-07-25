import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';

/* eslint-disable react/prop-types, react/forbid-prop-types */

@FragmentContainer(graphql`
  fragment ContentNode_content on ContentNode @relay(plural: true) {
    tagName
    attributes {
      name
      value
    }
    text
    children {
      tagName
      attributes {
        name
        value
      }
      text
      children {
        tagName
        attributes {
          name
          value
        }
        text
        children {
          tagName
          attributes {
            name
            value
          }
          text
          children {
            tagName
            attributes {
              name
              value
            }
            text
            children {
              tagName
              attributes {
                name
                value
              }
              text
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
  };

  i = 0;

  parseChildren(children) {
    return children.map(node => node.text || this.parseElement(node));
  }

  parseElement(node) {
    const props = (node.attributes || []).reduce((memo, { name, value }) => {
      if (name === 'class' && this.props.styles) {
        memo.className = this.props.styles[value] ? css(this.props.styles[value]) : value;
      } else {
        memo[name] = value;
      }
      return memo;
    }, {});

    this.i += 1;
    props.key = `key-${this.i}`;

    let children = null;
    if (node.children) {
      children = this.parseChildren(node.children);
    }

    return React.createElement(node.tagName, props, children);
  }

  render() {
    const { component: ContentComponent, content: data, styles, relay, ...rest } = this.props;

    return (
      <ContentComponent {...rest}>
        {data.map(node => node.text || this.parseElement(node))}
      </ContentComponent>
    );
  }
}
