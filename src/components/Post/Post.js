import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Link } from 'found';
import FragmentContainer from 'decorators/FragmentContainer';
import Media from '../Media';
import { convertPlaceholders } from '../../utils';
import styles from './Post.scss';

/* eslint-disable react/no-danger */

@FragmentContainer(graphql`
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
`)
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.object,
      content: PropTypes.object,
      excerpt: PropTypes.object,
      featured_media: PropTypes.object,
    }).isRequired,
  };

  content = null;
  bindRef = node => {
    this.content = node;
  };

  componentDidMount() {
    const nodes = this.content.querySelectorAll('.hft-yt-placeholder');
    if (!nodes) {
      return;
    }
    nodes.forEach(node => {
      node.onclick = e => {
        e.preventDefault();
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
        {featuredMedia &&
          <Link to={`/post/${id}`}>
            <Media media={featuredMedia} />
          </Link>}
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
