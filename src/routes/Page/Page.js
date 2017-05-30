import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import FragmentContainer from 'decorators/FragmentContainer';
import { Link } from 'react-router-dom';
import Media from 'components/Media';
import PageQuery from 'queries/Page';
import styles from './Page.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-danger */

@QueryRenderer(PageQuery)
@FragmentContainer(graphql`
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
`)
export default class Page extends Component {
  render() {
    const {
      page: {
        id,
        slug,
        title: { rendered: title },
        content: { rendered: content },
        featured_media: featuredMedia,
      },
    } = this.props;

    return (
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
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    );
  }
}
