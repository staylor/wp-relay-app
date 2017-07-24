import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, createFragmentContainer } from 'react-relay';
import { css } from 'glamor';
import Media from 'components/Media';
import Error from 'components/Error';
import { SITE_URL } from 'utils/constants';
import styles from './styles';

/* eslint-disable react/no-danger */

const Page = ({ viewer: { page } }) => {
  if (!page) {
    return <Error />;
  }

  const { slug, title: { rendered: title }, content: { rendered: content }, featuredMedia } = page;
  const url = `${SITE_URL}/${slug}`;
  const featuredImage = (featuredMedia && featuredMedia.source_url) || null;

  return (
    <article className={css(styles.content)}>
      <Helmet>
        <title>
          {title}
        </title>
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        <meta name="twitter:title" content={title} />
        {featuredImage && <meta name="twitter:image" content={featuredImage} />}
      </Helmet>
      <header>
        <h1 className={css(styles.title)} dangerouslySetInnerHTML={{ __html: title }} />
      </header>
      {featuredMedia && <Media media={featuredMedia} crop={'large'} />}
      <section dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

Page.propTypes = {
  viewer: PropTypes.shape({
    page: PropTypes.object,
  }).isRequired,
};

export default createFragmentContainer(
  Page,
  graphql`
    fragment Page_viewer on Viewer {
      page(slug: $slug) {
        id
        slug
        title {
          rendered
        }
        content {
          rendered
        }
        featuredMedia {
          ... on Image {
            source_url
          }
          ...Media_media
        }
      }
    }
  `
);
