import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Relay, { withRelay } from 'decorators/withRelay';
import Link from 'react-router/lib/Link';
import { FormattedRelative } from 'react-intl';
import Media from 'components/Media';
import Comments from 'components/Comments';
import { convertPlaceholders } from 'utils';
import styles from './Single.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        date
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
    comments: () => Relay.QL`
      fragment on CommentCollection {
        ${Comments.getFragment('comments')}
      }
    `,
  },
})
export default class Single extends Component {
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
        featured_media,
        tags,
      },
      comments,
    } = this.props;

    return (
      <article className={styles.content}>
        <Helmet
          title={title}
          link={[{ rel: 'canonical', href: `https://highforthis.com/post/${id}` }]}
        />
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>

          <div className={styles.meta}>
            Posted: <FormattedRelative value={Date.parse(date)} style="numeric" />
          </div>
        </header>
        {featured_media && <Media media={featured_media} crop={'large'} />}
        <section
          ref={this.bindRef}
          dangerouslySetInnerHTML={{
            __html: convertPlaceholders(content, styles),
          }}
        />
        {tags && (<footer className={styles.footer}>
          Tags: {tags.map(tag => (
            <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>
          ))}
        </footer>)}
        <Comments comments={comments} />
      </article>
    );
  }
}
