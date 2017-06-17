import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import TagQuery from 'queries/Tag';
import TagPaginationFragment from 'queries/fragment/Tag';
import Archive from 'components/Archive';
import Error from 'components/Error';
import { SITE_URL } from 'utils/constants';
import styles from './Tag.scss';

const Tag = ({ viewer: { tag, posts }, relay }) => {
  if (!tag) {
    return <Error />;
  }

  const title = `${tag.taxonomy.labels.singular}: ${tag.name}`;
  const url = `${SITE_URL}/${tag.taxonomy.rewrite.slug}/${tag.slug}`;

  return (
    <div className={styles.sections}>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
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
  query: TagQuery,
})(Tag);
