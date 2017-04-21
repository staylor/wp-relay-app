import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import Media from '../Media';
import { convertPlaceholders } from '../../utils';
import styles from './Post.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

class Post extends Component {
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

        // browserHistory.push(`/post/${this.props.post.id}`);
      };
    });
  }

  render() {
    const {
      id,
      title: { rendered: title },
      content: { rendered: content },
      excerpt: { rendered: excerpt },
      featured_media: featuredMedia,
    } = this.props.post;

    return (
      <article>
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
        </header>
        {featuredMedia && (
          <Link to={`/post/${id}`}>
            <Media media={featuredMedia} />
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

export default createFragmentContainer(Post, graphql`
  fragment Post_post on Post {
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
      ...Media_media
    }
  }
`);
