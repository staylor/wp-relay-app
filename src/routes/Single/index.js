import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Post from 'components/Post';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        ${Post.getFragment('post')}
      }
    `,
  },
})
export default class Single extends Component {
  render() {
    return <Post post={this.props.post} />;
  }
}
