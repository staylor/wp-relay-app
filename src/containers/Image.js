import React, { Component } from 'react';
import { graphql } from 'react-relay';
import ResponsiveImage from 'wp-styled-components/lib/Image';
import FragmentContainer from 'decorators/FragmentContainer';
import type { ImageProps } from 'wp-relay-app';

@FragmentContainer(graphql`
  fragment Image_image on Media {
    ... on Image {
      sourceUrl
      mediaDetails {
        sizes {
          name
          sourceUrl
        }
      }
    }
  }
`)
export default class Image extends Component {
  props: ImageProps;

  static defaultProps = {
    crop: 'large',
  };

  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
