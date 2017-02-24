import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import styles from './Term.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    term: () => Relay.QL`
      fragment on TermInterface {
        id
        name
        taxonomy {
          slug
        }
      }
    `,
    posts: () => Relay.QL`
      fragment on PostCollection {
        ${Archive.getFragment('posts')}
      }
    `,
  },
})
export default class Term extends Component {
  static getTaxonomyDisplay(taxonomy) {
    switch (taxonomy) {
      case 'post_tag':
        return 'Tagged';
      default:
        return taxonomy.slug.toUpperCase();
    }
  }

  static getTaxonomyRewriteSlug(taxonomy) {
    switch (taxonomy.slug) {
      case 'post_tag':
        return 'tag';
      default:
        return taxonomy.slug;
    }
  }

  render() {
    const { term, posts } = this.props;
    const label = this.constructor.getTaxonomyDisplay(term.taxonomy);
    const title = `${label}: ${term.name}`;
    const rewriteSlug = this.constructor.getTaxonomyRewriteSlug(term.taxonomy);

    return (
      <div className={styles.sections}>
        <Helmet
          title={title}
          link={[
            {
              rel: 'canonical',
              href: `https://highforthis.com/${rewriteSlug}/${term.id}`,
            },
          ]}
        />
        {term && (<section>
          <h3 className={styles.label}>{title}</h3>
          <Archive posts={posts} />
        </section>)}
      </div>
    );
  }
}
