import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import { Link } from 'found';
import { FormattedRelative } from 'react-intl';
import FragmentContainer from 'decorators/FragmentContainer';
import Media from 'components/Media';
import Comments from 'components/Comments';
import Error from 'components/Error';
import { convertPlaceholders } from 'utils';
import { dateRegex } from 'utils/regex';
import { SITE_URL } from 'utils/constants';
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
      excerpt {
        raw
      }
      featuredMedia {
        ...Media_media
        ... on Image {
          source_url
        }
      }
      tags {
        id
        name
        slug
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
    if (!this.props.viewer.post) {
      return <Error />;
    }

    const {
      post: {
        id,
        date,
        title: { rendered: title },
        content: { rendered: content },
        excerpt: { raw: excerpt },
        featuredMedia,
        tags,
        comments,
      },
    } = this.props.viewer;

    const [, year, month] = dateRegex.exec(date);
    const url = `${SITE_URL}/post/${id}`;
    const featuredImage = (featuredMedia && featuredMedia.source_url) || null;

    return (
      <article className={styles.content}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={url} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={url} />
          <meta property="og:description" content={excerpt} />
          {featuredImage && <meta property="og:image" content={featuredImage} />}
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={excerpt} />
          {featuredImage && <meta name="twitter:image" content={featuredImage} />}
        </Helmet>
        <header>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />

          <div className={styles.meta}>
            Posted:
            {' '}
            <Link to={`/${year}/${month}`}>
              <FormattedRelative
                value={Date.parse(date)}
                style="numeric" // eslint-disable-line react/style-prop-object
              />
            </Link>
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
            {tags.map(tag => <Link key={tag.id} to={`/tag/${tag.slug}`}>{tag.name}</Link>)}
          </footer>}
        <Comments post={id} comments={comments} />
      </article>
    );
  }
}
