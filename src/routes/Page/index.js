import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, createFragmentContainer } from 'react-relay';
import { ArticleWrapper, Heading, ContentSection } from 'wp-styled-components';
import Media from 'components/Media';
import Error from 'components/Error';
import ContentNode from 'components/ContentNode';
import { SITE_URL } from 'utils/constants';

/* eslint-disable react/no-danger */

const Page = ({ viewer: { page } }) => {
  if (!page) {
    return <Error />;
  }

  const { slug, title, content: { data: content }, featuredMedia } = page;
  const url = `${SITE_URL}/${slug}`;
  const featuredImage = (featuredMedia && featuredMedia.sourceUrl) || null;

  return (
    <ArticleWrapper>
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
        <Heading>
          {title.raw}
        </Heading>
      </header>
      {featuredMedia && <Media media={featuredMedia} crop={'large'} />}
      <ContentNode component={ContentSection} content={content} />
    </ArticleWrapper>
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
