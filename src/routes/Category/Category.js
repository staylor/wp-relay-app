import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import CategoryQuery from 'queries/Category';
import CategoryPaginationFragment from 'queries/fragment/Category';
import Archive from 'components/Archive';
import Error from 'components/Error';
import { SITE_URL } from 'utils/constants';
import styles from './Category.scss';

const Category = ({ viewer: { category, posts }, relay }) => {
  if (!category) {
    return <Error />;
  }

  const title = `${category.taxonomy.labels.singular}: ${category.name}`;
  const url = `${SITE_URL}/${category.taxonomy.rewrite.slug}/${category.slug}`;

  return (
    <div className={styles.sections}>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
      </Helmet>
      <section>
        <h3 className={styles.label}>{title}</h3>
        <Archive {...{ posts, relay }} />
      </section>
    </div>
  );
};

Category.propTypes = {
  viewer: PropTypes.shape({
    category: PropTypes.object,
    posts: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  relay: PropTypes.object.isRequired,
};

export default PaginationContainer(CategoryPaginationFragment, {
  query: CategoryQuery,
})(Category);
