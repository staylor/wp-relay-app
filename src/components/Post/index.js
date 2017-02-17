import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { Link } from 'react-router';
import Image from 'components/Image';
import styles from './styles.scss';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

@withRelay({
  initialVariables: {
    total: 10,
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title {
          rendered
        }
        featured_media {
          ${Image.getFragment('image')}
        }
      }
    `,
  },
})
export default class Post extends Component {
  render() {
    const { id, title, author, featured_media } = this.props.post;
    return (
      <article>
        <h3 className={styles.title}>
          <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </h3>
        {featured_media && <Image image={featured_media} />}
      </article>
    );
  }
}
