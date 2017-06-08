import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import { getTaxonomyDisplay, getTaxonomyRewriteSlug } from 'utils/taxonomy';
import Archive from 'components/Archive';
import styles from './Tag.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Tag_viewer on Viewer {
    tag(id: $id) {
      id
      name
      taxonomy {
        slug
      }
    }
    posts(tag: $id) {
      ...Archive_posts
    }
  }
`)
export default class Tag extends Component {
  render() {
    const { tag, posts } = this.props.viewer;
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
            <Archive posts={posts} />
          </section>}
      </div>
    );
  }
}
