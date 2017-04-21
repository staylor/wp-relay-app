import React from 'react';
import Stickies from './Stickies';
import ReadThis from './ReadThis';
import WatchThis from './WatchThis';
import ListenToThis from './ListenToThis';
import styles from './Home.scss';

/* eslint-disable react/prop-types */

const Home = () => (
  <div className={styles.columns}>
    <div className={styles.columnA}>
      <Stickies total={10} />
      <ReadThis categories="Q2F0ZWdvcnk6Mw==" />
    </div>
    <div className={styles.columnB}>
      <section className={styles.section}>
        <h3>Watch This</h3>
        <WatchThis categories="Q2F0ZWdvcnk6NA==" />
      </section>
      <section className={styles.section}>
        <h3>Listen To This</h3>
        <ListenToThis categories="Q2F0ZWdvcnk6NQ==" />
      </section>
    </div>
  </div>
);

export default Home;
