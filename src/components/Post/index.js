import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { Link } from 'react-router';
import Media from 'components/Media';
import styles from './Post.scss';

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
        content {
          rendered
        }
        featured_media {
          ${Media.getFragment('media')}
        }
      }
    `,
  },
})
export default class Post extends Component {
  render() {
    const {
      id,
      title: { rendered: title },
      content: { rendered: content },
      featured_media,
    } = this.props.post;
    return (
      <article>
        <h3 className={styles.title}>
          <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        {featured_media && <Media media={featured_media} />}
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/hft-oembed-placeholder/g, styles.placeholder)
              .replace(/"arrow"/g, `"${styles.arrow}"`),
          }}
        />
      </article>
    );
  }
}
