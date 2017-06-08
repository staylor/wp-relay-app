import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import Archive from 'components/Archive';
import styles from './Category.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Category_viewer on Viewer {
    category(id: $id) {
      id
      name
      taxonomy {
        slug
      }
    }
    posts(category: $id) {
      ...Archive_posts
    }
  }
`)
export default class Category extends Component {
  render() {
    const { category, posts } = this.props.viewer;
    const label = getTaxonomyDisplay(category.taxonomy);
    const title = `${label}: ${category.name}`;
    const rewriteSlug = getTaxonomyRewriteSlug(category.taxonomy);

    return (
      <div className={styles.sections}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`https://highforthis.com/${rewriteSlug}/${category.id}`} />
        </Helmet>
        {category &&
          <section>
            <h3 className={styles.label}>{title}</h3>
            <Archive posts={posts} />
          </section>}
      </div>
    );
  }
}
