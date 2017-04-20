import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Image from '../Image';

/* eslint-disable react/prop-types */

const Media = ({ media }) => {
  // eslint-disable-next-line no-underscore-dangle
  switch (media.__typename) {
    case 'Image':
      return <Image image={media} crop={this.props.crop} />;
    default:
      return null;
  }
};

Media.defaultProps = {
  crop: 'large',
  media: null,
};

export default createFragmentContainer(Media, graphql`
  fragment Media_media on Media {
    __typename
    ...Image_image
  }
`);
