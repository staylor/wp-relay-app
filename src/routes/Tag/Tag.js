import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import TagQuery from 'queries/Tag';
import TagPaginationFragment from 'queries/fragment/Tag';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import Archive from 'components/Archive';
import styles from './Tag.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@PaginationContainer(TagPaginationFragment, {
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.tag.id,
      count,
      cursor,
    };
  },
  query: TagQuery,
})
export default class Tag extends Component {
  render() {
    const { viewer: { tag, posts }, relay } = this.props;
    const label = getTaxonomyDisplay(tag.taxonomy);
    const title = `${label}: ${tag.name}`;
    const rewriteSlug = getTaxonomyRewriteSlug(tag.taxonomy);

    return (
      <div className={styles.sections}>
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`https://highforthis.com/${rewriteSlug}/${tag.id}`} />
        </Helmet>
        {tag &&
          <section>
            <h3 className={styles.label}>{title}</h3>
            <Archive {...{ posts, relay }} />
          </section>}
      </div>
    );
  }
}
