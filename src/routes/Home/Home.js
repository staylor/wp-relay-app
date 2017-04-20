import React from 'react';
import Stickies from 'containers/Stickies';
import HomeCollection from 'containers/HomeCollection';
import styles from './Home.scss';

/* eslint-disable react/prop-types */

const Home = ({
  stickies,
  readThis,
  watchThis,
  listenToThis,
}) => (
  <div className={styles.columns}>
    <div className={styles.columnA}>
      {stickies && (
        <section className={styles.section}>
          <h3>Latest</h3>
          <Stickies />
        </section>
      )}
      {readThis && (
        <section className={styles.section}>
          <h3>Read This</h3>
          <HomeCollection categoryID="Q2F0ZWdvcnk6Mw==" />
        </section>
      )}
    </div>
    <div className={styles.columnB}>
      {watchThis && (
        <section className={styles.section}>
          <h3>Watch This</h3>
          <HomeCollection categoryID="Q2F0ZWdvcnk6NA==" />
        </section>
      )}
      {listenToThis && (
        <section className={styles.section}>
          <h3>Listen To This</h3>
          <HomeCollection categoryID="Q2F0ZWdvcnk6NQ==" />
        </section>
      )}
    </div>
  </div>
);

export default Home;
