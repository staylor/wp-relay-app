import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Media from 'components/Media';
import Error from 'components/Error';
import styles from './Page.scss';

/* eslint-disable react/no-danger */

const Page = ({ viewer: { page } }) => {
  if (!page) {
    return <Error />;
  }

  const {
    slug,
    title: { rendered: title },
    content: { rendered: content },
    featured_media: featuredMedia,
  } = page;
  return (
    <article className={styles.content}>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`https://highforthis.com/${slug}`} />
      </Helmet>
      <header>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
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

export default FragmentContainer(graphql`
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
      featured_media {
        ...Media_media
      }
    }
  }
`)(Page);
