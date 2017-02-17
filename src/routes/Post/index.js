import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Image from 'components/Image';
import styles from './styles.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title {
          rendered
        }
        content {
          rendered
        }
        author {
          name
        }
        featured_media {
          ... on Image {
            source_url
          }
          ${Image.getFragment('image')}
        }
      }
    `,
  },
})
export default class Post extends Component {
  render() {
    const {
      id,
      title,
      content,
      author,
      featured_media,
    } = this.props.post;

    return (
      <article>
        <header>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </header>
        {featured_media && <Image image={featured_media} />}
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content.rendered }}
        />
      </article>
    );
  }
}
