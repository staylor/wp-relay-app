import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { Link } from 'react-router';
import Media from 'components/Media';
import { convertPlaceholders } from 'utils';
import styles from './Post.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/prefer-stateless-function */
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
        excerpt {
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
      excerpt: { rendered: excerpt },
      featured_media,
    } = this.props.post;

    return (
      <article>
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
        </header>
        {featured_media && (
          <Link to={`/post/${id}`}>
            <Media media={featured_media} />
          </Link>
        )}
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: excerpt || convertPlaceholders(content, styles),
          }}
        />
      </article>
    );
  }
}
