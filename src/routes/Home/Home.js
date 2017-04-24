import React from 'react';
import Stickies from './Stickies';
import Featured from './Featured';
// import ReadThis from './ReadThis';
// import WatchThis from './WatchThis';
// import ListenToThis from './ListenToThis';
import styles from './Home.scss';

/* eslint-disable react/prop-types */

const Home = () => (
  <div className={styles.columns}>
    <div className={styles.columnA}>
      <Stickies total={3} />
      <section className={styles.section}>
        <h3>Read This</h3>
        <Featured total={5} categories="Q2F0ZWdvcnk6Mw==" />
      </section>
    </div>
    <div className={styles.columnB}>
      <section className={styles.section}>
        <h3>Watch This</h3>
        <Featured total={5} categories="Q2F0ZWdvcnk6NA==" />
      </section>
      <section className={styles.section}>
        <h3>Listen to This</h3>
        <Featured total={5} categories="Q2F0ZWdvcnk6NQ==" />
      </section>
    </div>
  </div>
);

export default Home;
