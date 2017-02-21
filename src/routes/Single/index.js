import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { Link } from 'react-router';
import Media from 'components/Media';
import { convertPlaceholders } from 'utils';
import styles from './Single.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/prefer-stateless-function */
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
        featured_media {
          ${Media.getFragment('media')}
        }
        tags {
          id
          name
        }
      }
    `,
  },
})
export default class Single extends Component {
  render() {
    const {
      id,
      title: { rendered: title },
      content: { rendered: content },
      featured_media,
      tags,
    } = this.props.post;

    return (
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
        </header>
        {featured_media && <Media media={featured_media} crop={'large'} />}
        <section
          dangerouslySetInnerHTML={{
            __html: convertPlaceholders(content, styles),
          }}
        />
        {tags && (<footer className={styles.footer}>
          Tags: {tags.map(tag => (
            <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>
          ))}
        </footer>)}
      </article>
    );
  }
}
