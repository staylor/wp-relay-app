import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, createFragmentContainer } from 'react-relay';
import { css } from 'glamor';
import Media from 'components/Media';
import Error from 'components/Error';
import ContentNode from 'components/ContentNode';
import { SITE_URL } from 'utils/constants';
import styles from './styles';

/* eslint-disable react/no-danger */

const Page = ({ viewer: { page } }) => {
  if (!page) {
    return <Error />;
  }

  const { slug, title, content: { data: content }, featuredMedia } = page;
  const url = `${SITE_URL}/${slug}`;
  const featuredImage = (featuredMedia && featuredMedia.sourceUrl) || null;

  return (
    <article className={css(styles.content)}>
      <Helmet>
        <title>
          {title.raw}
        </title>
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title.raw} />
        <meta property="og:url" content={url} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        <meta name="twitter:title" content={title.raw} />
        {featuredImage && <meta name="twitter:image" content={featuredImage} />}
      </Helmet>
      <header>
        <h1 className={css(styles.title)}>
          {title.raw}
        </h1>
      </header>
      {featuredMedia && <Media media={featuredMedia} crop={'large'} />}
      <ContentNode
        component={'section'}
        styles={styles}
        className={css(styles.content)}
        content={content}
      />
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
          raw
        }
        content {
          data {
            ...ContentNode_content
          }
        }
        featuredMedia {
          ... on Image {
            sourceUrl
          }
          ...Media_media
        }
      }
    }
  `
);
