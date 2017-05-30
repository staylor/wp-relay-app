import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import FragmentContainer from 'decorators/FragmentContainer';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import TagQuery from 'queries/Tag';
import TagArchive from './TagArchive';
import styles from './Tag.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@QueryRenderer(TagQuery)
@FragmentContainer(graphql`
  fragment Tag_term on TermInterface {
    id
    name
    taxonomy {
      slug
    }
  }
`)
export default class Tag extends Component {
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
        {term &&
          <section>
            <h3 className={styles.label}>{title}</h3>
            <TagArchive id={term.id} />
          </section>}
      </div>
    );
  }
}
