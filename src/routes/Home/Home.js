import React, { Component } from 'react';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Archive from 'components/Archive';
import styles from './Home.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@FragmentContainer(graphql`
  fragment Home_viewer on Viewer {
    readThis: posts(categories: $readThisID, last: 5) {
      ...Archive_posts
    }
    watchThis: posts(categories: $watchThisID, last: 5) {
      ...Archive_posts
    }
    listenToThis: posts(categories: $listenToThisID, last: 5) {
      ...Archive_posts
    }
  }
`)
export default class Home extends Component {
  render() {
    const { readThis, watchThis, listenToThis } = this.props.viewer;

    return (
      <div className={styles.columns}>
        <div className={styles.columnA}>
          <section className={styles.section}>
            <h3>Read This</h3>
            <Archive posts={readThis} />
          </section>
        </div>
        <div className={styles.columnB}>
          <section className={styles.section}>
            <h3>Watch This</h3>
            <Archive posts={watchThis} />
          </section>
          <section className={styles.section}>
            <h3>Listen to This</h3>
            <Archive posts={listenToThis} />
          </section>
        </div>
      </div>
    );
  }
}
