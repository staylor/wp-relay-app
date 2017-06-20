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
    post(slug: $slug) {
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
      comments(slug: $slug, first: 100) @connection(key: "Single_post_comments") {
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
    const nodes = this.content.querySelectorAll(`figure.${styles.embed}`);
    if (!nodes) {
      return;
    }
    nodes.forEach(node => {
      node.onclick = e => {
        e.preventDefault();

        const payload = node.querySelector('script[type="application/json"]').innerHTML;
        const data = JSON.parse(payload);
        const elem = e.currentTarget;
        const txt = document.createElement('textarea');
        txt.innerHTML = data.html;
        let width = data.width;
        let height = data.height;
        let html = txt.value;
        if (width < 740) {
          height = height * 740 / width;
          width = 740;
          html = html
            .replace(/width="[0-9]+"/, `width="${width}"`)
            .replace(/height="[0-9]+"/, `height="${height}"`);
        }

        elem.outerHTML = html;
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
        slug,
        date,
        title: { rendered: title },
        content: { rendered: content },
        excerpt: { raw: excerpt },
        featuredMedia,
        tags,
        comments,
      },
    } = this.props.viewer;

    const [, year, month, day] = dateRegex.exec(date);
    const url = `${SITE_URL}/${year}/${month}/${day}/${slug}`;
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
