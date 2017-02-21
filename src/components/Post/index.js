import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import Media from 'components/Media';
import { convertPlaceholders } from 'utils';
import styles from './Post.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
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
  content = null;
  bindRef = (node) => { this.content = node; };

  componentDidMount() {
    const nodes = this.content.querySelectorAll('.hft-yt-placeholder');
    if (!nodes) {
      return;
    }
    nodes.forEach((node) => {
      node.onclick = (e) => {
        e.preventDefault();

        browserHistory.push(`/post/${this.props.post.id}`);
      };
    });
  }

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
          ref={this.bindRef}
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: excerpt || convertPlaceholders(content, styles),
          }}
        />
      </article>
    );
  }
}
