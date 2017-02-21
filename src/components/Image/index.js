import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import styles from './Image.scss';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    image: () => Relay.QL`
      fragment on Media {
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
    `,
  },
})
export default class Image extends Component {
  static defaultProps = {
    crop: 'medium',
  };

  render() {
    const {
      source_url,
      media_details: { sizes },
    } = this.props.image;

    if (!source_url) {
      return '';
    }

    const chosen = sizes.find(size => size.name === this.props.crop);

    return (
      <figure>
        <img className={styles.image} src={chosen.source_url} role="presentation" />
      </figure>
    );
  }
}
