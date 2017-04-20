import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Archive from 'components/Archive';
import Page from '../Page';
import styles from './Ambiguous.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

class Ambiguous extends Component {
  static defaultProps = {
    year: null,
    page: null,
  };

  render() {
    const { year, page } = this.props;
    if (page) {
      return <Page {...this.props} />;
    }

    return (
      <div className={styles.sections}>
        <section>
          <h3>TK TK TK TK</h3>
          <Archive posts={year} />
        </section>
      </div>
    );
  }
}

export default createFragmentContainer(Ambiguous, {
  year: graphql`
    fragment Ambiguous_year on PostCollection {
      ...Archive_posts
    }
  `,
  page: graphql`
    fragment Ambiguous_page on Page {
      ...Page_page
    }
  `,
});
