import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';
import styles from './styles';

@FragmentContainer(graphql`
  fragment Content_content on ContentNode @relay(plural: true) {
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
export default class Content extends Component {
  static propTypes = {
    // eslint-disable-next-line
    content: PropTypes.array.isRequired,
  };

  i = 0;

  onClick = e => {
    const maxWidth = 740;
    e.preventDefault();

    const data = JSON.parse(
      e.currentTarget.querySelector('script[type="application/json"]').innerHTML
    );
    let width = data.width;
    let height = data.height;
    let html = data.html;
    if (html.indexOf('<iframe') === 0) {
      html = html.replace(/<iframe /, `<iframe class="${css(styles.iframe)}" `);
      if (width < maxWidth) {
        height = Math.ceil(height * maxWidth / width);
        width = maxWidth;
        html = html
          .replace(/width="[0-9]+"/, `width="${width}"`)
          .replace(/height="[0-9]+"/, `height="${height}"`);
      }
    }

    e.currentTarget.outerHTML = html;
  };

  parseChildren(children) {
    return children.map(node => node.text || this.parseElement(node));
  }

  parseElement(node) {
    const props = (node.attributes || []).reduce((memo, { name, value }) => {
      if (name === 'class') {
        if (value === 'embed') {
          memo.onClick = this.onClick;
        }
        memo.className = css(styles[value]);
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
        {data.map(node => this.parseElement(node))}
      </section>
    );
  }
}
