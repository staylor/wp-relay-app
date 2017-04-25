import React, { Component } from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from 'decorators/QueryRenderer';
import Archive from 'components/Archive';
import styles from '../Home.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@QueryRenderer(graphql`
  query StickiesQuery($total: Int) {
    stickies {
      ...Archive_posts
    }
  }
`)
class Stickies extends Component {
  render() {
    const { stickies } = this.props;

    return (
      <section className={styles.section}>
        <h3>Latest</h3>
        <Archive posts={stickies} />
      </section>
    );
  }
}

export default Stickies;
