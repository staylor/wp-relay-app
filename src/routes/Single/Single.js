import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import { Link } from 'found';
import { FormattedRelative } from 'react-intl';
import FragmentContainer from 'decorators/FragmentContainer';
import Media from 'components/Media';
import Comments from 'components/Comments';
import { convertPlaceholders } from 'utils';
import styles from './Single.scss';

/* eslint-disable react/no-danger */

@FragmentContainer(graphql`
  fragment Single_viewer on Viewer {
    post(id: $id) {
      id
      date
      title {
        rendered
      }
      content {
        rendered
      }
      featured_media {
        ...Media_media
      }
      tags {
        id
        name
      }
      comments(post: $id, first: 100) @connection(key: "Single_post_comments") {
        edges {
          node {
            id
            parent
            ...Comment_comment
          }
        }
      }
    }
  }
`)
export default class Single extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      post: PropTypes.object,
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

        const elem = e.currentTarget;
        const iframe = `<iframe
          width="${elem.getAttribute('data-yt-w')}"
          height="${elem.getAttribute('data-yt-h')}"
          src="http://www.youtube.com/embed/${elem.getAttribute('data-yt-id')}?autoplay=1"
          frameborder="0"
          webkitAllowFullScreen mozallowfullscreen allowFullScreen><iframe>`;

        elem.outerHTML = iframe;
      };
    });
  }

  render() {
    const {
      post: {
        id,
        date,
        title: { rendered: title },
        content: { rendered: content },
        featured_media: featuredMedia,
        tags,
        comments,
      },
    } = this.props.viewer;

    return (
      <article className={styles.content}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`https://highforthis.com/post/${id}`} />
        </Helmet>
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>

          <div className={styles.meta}>
            Posted:
            {' '}
            <FormattedRelative
              value={Date.parse(date)}
              style="numeric" // eslint-disable-line react/style-prop-object
            />
          </div>
        </header>
        {featuredMedia && <Media media={featuredMedia} crop={'large'} />}
        <section
          ref={this.bindRef}
          dangerouslySetInnerHTML={{
            __html: convertPlaceholders(content, styles),
          }}
        />
        {tags &&
          <footer className={styles.footer}>
            Tags:
            {' '}
            {tags.map(tag => <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>)}
          </footer>}
        <Comments post={id} comments={comments} />
      </article>
    );
  }
}
