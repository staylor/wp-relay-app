import React from 'react';
import Relay from 'react-relay';
import styles from './styles.scss';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

const Image = ({ image: { source_url } }) => {
  if (!source_url) {
    return '';
  }

  return (
    <figure>
      <img className={styles.image} src={source_url} role="presentation" />
    </figure>
  );
};

export default Relay.createContainer(Image, {
  fragments: {
    image: () => Relay.QL`
      fragment on Media {
        ... on Image {
          source_url
        }
      }
    `,
  },
});
