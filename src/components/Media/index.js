import React from 'react';
import Relay from 'react-relay';
import Image from 'components/Image';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

const Media = ({ media }) => {
  // eslint-disable-next-line no-underscore-dangle
  switch (media.__typename) {
    case 'Image':
      return <Image image={media} />;
    default:
      return null;
  }
};

export default Relay.createContainer(Media, {
  fragments: {
    media: () => Relay.QL`
      fragment on Media {
        __typename
        ${Image.getFragment('image')}
      }
    `,
  },
});
