import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import ResponsiveImage from 'wp-styled-components/lib/Image';
import FragmentContainer from 'decorators/FragmentContainer';

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
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    crop: PropTypes.string,
    image: PropTypes.shape({
      sourceUrl: PropTypes.String,
      mediaDetails: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    crop: 'large',
  };

  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
