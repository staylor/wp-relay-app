import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Image from '../Image';

const Media = ({ media, crop = null }) => {
  switch (media.__typename) {
    case 'Image':
      return <Image image={media} crop={crop} />;
    default:
      return null;
  }
};

Media.propTypes = {
  crop: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  media: PropTypes.object.isRequired,
};

Media.defaultProps = {
  crop: 'large',
};

export default createFragmentContainer(
  Media,
  graphql`
    fragment Media_media on Media {
      __typename
      ...Image_image
    }
  `
);
