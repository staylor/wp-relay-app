import React from 'react';
import Helmet from 'react-helmet';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import Media from '../components/Media';
import styles from './scss/Page.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */

const Page = ({
  page: {
    id,
    slug,
    title: { rendered: title },
    content: { rendered: content },
    featured_media: featuredMedia,
  },
}) => (
  <article className={styles.content}>
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={`https://highforthis.com/${slug}`} />
    </Helmet>
    <header>
      <h1 className={styles.title}>
        <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
      </h1>
    </header>
    {featuredMedia && <Media media={featuredMedia} crop={'large'} />}
    <section
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </article>
);

export default createFragmentContainer(Page, graphql`
  fragment Page_page on Page {
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
`);
