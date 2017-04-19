import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import styles from './scss/Image.scss';

/* eslint-disable react/prop-types */

class Image extends Component {
  static defaultProps = {
    crop: 'large',
  };

  getCrop(sizes) {
    let chosen;
    const choices = [
      this.props.crop,
      this.constructor.defaultProps.crop,
      'full',
    ];

    for (let i = 0; i < choices.length; i += 1) {
      chosen = sizes.find(size => size.name === choices[i]);
      if (chosen) {
        return chosen;
      }
    }

    return null;
  }

  render() {
    const {
      source_url: sourceUrl,
      media_details: { sizes },
    } = this.props.image;

    if (!sourceUrl) {
      return '';
    }

    const chosen = this.getCrop(sizes);
    if (!chosen) {
      return null;
    }

    return (
      <figure>
        <img alt="" className={styles.image} src={chosen.source_url} role="presentation" />
      </figure>
    );
  }
}

export default createFragmentContainer(Image, graphql`
  fragment Image_image on Media {
    ... on Image {
      source_url
      media_details {
        sizes {
          name
          source_url
        }
      }
    }
  }
`);
