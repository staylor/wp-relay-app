import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import CategoryQuery from 'queries/Category';
import CategoryPaginationFragment from 'queries/fragment/Category';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import Archive from 'components/Archive';
import styles from './Category.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@PaginationContainer(CategoryPaginationFragment, {
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.category.id,
      count,
      cursor,
    };
  },
  query: CategoryQuery,
})
export default class Category extends Component {
  render() {
    const { viewer: { category, posts }, relay } = this.props;
    const label = getTaxonomyDisplay(category.taxonomy);
    const title = `${label}: ${category.name}`;
    const rewriteSlug = getTaxonomyRewriteSlug(category.taxonomy);

    return (
      <div className={styles.sections}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`https://highforthis.com/${rewriteSlug}/${category.id}`} />
        </Helmet>
        <section>
          <h3 className={styles.label}>{title}</h3>
          <Archive {...{ posts, relay }} />
        </section>
      </div>
    );
  }
}
