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
  render() {
    const { term, posts } = this.props;
    return (
      <div className={styles.sections}>
        {term && (<section>
          <h3>{term.name}</h3>
          <Archive posts={posts} />
        </section>)}
      </div>
    );
  }
}
