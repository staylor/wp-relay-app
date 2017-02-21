import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Image from 'components/Image';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    media: () => Relay.QL`
      fragment on Media {
        __typename
        ${Image.getFragment('image')}
      }
    `,
  },
})
export default class Media extends Component {
  static defaultProps = {
    crop: 'medium',
    media: null,
  };

  render() {
    const { media } = this.props;

    // eslint-disable-next-line no-underscore-dangle
    switch (media.__typename) {
      case 'Image':
        return <Image image={media} crop={this.props.crop} />;
      default:
        return null;
    }
  }
}
