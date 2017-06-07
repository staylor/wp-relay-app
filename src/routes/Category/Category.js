import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import CategoryArchive from './CategoryArchive';
import styles from './Category.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Category_category on Category {
    id
    name
    taxonomy {
      slug
    }
  }
`)
export default class Category extends Component {
  render() {
    const { category } = this.props;
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
            <CategoryArchive id={category.id} count={10} />
          </section>}
      </div>
    );
  }
}
