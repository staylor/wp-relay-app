import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PaginationContainer from 'decorators/PaginationContainer';
import CategoryQuery from 'queries/Category';
import CategoryPaginationFragment from 'queries/fragment/Category';
import Archive from 'components/Archive';
import styles from './Category.scss';

const Category = ({ viewer: { category, posts }, relay }) => {
  const title = `${category.taxonomy.labels.singular}: ${category.name}`;
  return (
    <div className={styles.sections}>
      <Helmet>
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://highforthis.com/${category.taxonomy.rewrite.slug}/${category.id}`}
        />
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
  getVariables(props, { count, cursor }) {
    return {
      id: props.viewer.category.id,
      count,
      cursor,
    };
  },
  query: CategoryQuery,
})(Category);
