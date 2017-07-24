import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';
import styles from './styles';

@FragmentContainer(graphql`
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
`)
export default class Image extends Component {
  static propTypes = {
    crop: PropTypes.string,
    image: PropTypes.shape({
      source_url: PropTypes.String,
      media_details: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    crop: 'large',
  };

  getCrop(sizes) {
    let chosen;
    const choices = [this.props.crop, this.constructor.defaultProps.crop, 'full'];

    for (let i = 0; i < choices.length; i += 1) {
      chosen = sizes.find(size => size.name === choices[i]);
      if (chosen) {
        return chosen;
      }
    }

    return null;
  }

  render() {
    const { source_url: sourceUrl, media_details: { sizes } } = this.props.image;

    if (!sourceUrl) {
      return '';
    }

    const chosen = this.getCrop(sizes);
    if (!chosen) {
      return null;
    }

    return (
      <figure>
        <img alt="" className={css(styles.image)} src={chosen.source_url} />
      </figure>
    );
  }
}
