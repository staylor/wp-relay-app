import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import CategoryArchive from './CategoryArchive';
import styles from './Category.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

export const categoryFragment = graphql`
  fragment Category_term on Category {
    id
    name
    taxonomy {
      slug
    }
  }
`;

export default class Category extends Component {
  render() {
    const { term } = this.props;
    const label = getTaxonomyDisplay(term.taxonomy);
    const title = `${label}: ${term.name}`;
    const rewriteSlug = getTaxonomyRewriteSlug(term.taxonomy);

    return (
      <div className={styles.sections}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`https://highforthis.com/${rewriteSlug}/${term.id}`} />
        </Helmet>
        {term && (<section>
          <h3 className={styles.label}>{title}</h3>
          <CategoryArchive id={term.id} />
        </section>)}
      </div>
    );
  }
}
