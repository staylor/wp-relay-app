import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Text, Image, Dimensions, Linking } from 'react-native';

const textStyle = {
  fontSize: 20,
};

export default createFragmentContainer(
  ({ node, children, topLevel = false }) => {
    const props = {};
    const attrs = (node.attributes || []).reduce((memo, { name, value }) => {
      memo[name] = value;
      return memo;
    }, {});

    const elementChildren = children;
    let responsiveWidth = null;
    let responsiveHeight = null;
    let imageWidth = null;
    let imageHeight = null;

    let tag = Text;
    switch (node.tagName) {
      case 'img':
        tag = Image;

        responsiveWidth = Dimensions.get('window').width;
        imageWidth = attrs.width || responsiveWidth;
        imageHeight = attrs.height || responsiveWidth * 0.75;
        responsiveHeight = responsiveWidth * imageHeight / imageWidth;

        props.style = {
          flex: -1,
          width: responsiveWidth,
          height: responsiveHeight,
        };
        props.source = { uri: attrs.src };
        break;

      case 'blockquote':
        props.style = {
          paddingLeft: 20,
          paddingRight: 40,
          paddingBottom: 20,
          fontSize: 14,
        };
        break;

      case 'em':
        props.style = {
          textDecorationLine: 'underline',
        };
        break;

      case 'strong':
        props.style = { fontWeight: 'bold' };
        break;

      case 'a':
        props.style = { color: '#e50082' };
        props.onPress = () => Linking.openURL(attrs.href);
        break;

      case 'p':
        if (topLevel) {
          props.style = { ...textStyle, marginBottom: 20 };
        } else {
          props.style = { marginBottom: 20 };
        }
        break;
      default:
        break;
    }

    return React.createElement(tag, props, elementChildren);
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
