import React, { Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import Archive from 'components/Archive';
import styles from './Term.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    term: () => Relay.QL`
      fragment on TermInterface {
        name
        taxonomy
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
        return taxonomy.toUpperCase();
    }
  }

  render() {
    const { term, posts } = this.props;
    const label = this.constructor.getTaxonomyDisplay(term.taxonomy);

    return (
      <div className={styles.sections}>
        {term && (<section>
          <h3 className={styles.label}>{label}: {term.name}</h3>
          <Archive posts={posts} />
        </section>)}
      </div>
    );
  }
}
