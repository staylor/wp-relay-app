import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import TagQuery from 'queries/Tag';
import TagPaginationFragment from 'queries/fragment/Tag';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import Archive from 'components/Archive';
import styles from './Tag.scss';

const Tag = ({ viewer, relay }) => {
  const { tag, posts } = viewer;
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
};

Tag.propTypes = {
  viewer: PropTypes.shape({
    tag: PropTypes.object,
    posts: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object.isRequired,
};

export default PaginationContainer(TagPaginationFragment, {
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.tag.id,
      count,
      cursor,
    };
  },
  query: TagQuery,
})(Tag);
