import React from 'react';
import Stickies from './Stickies';
// import ReadThis from './ReadThis';
// import WatchThis from './WatchThis';
// import ListenToThis from './ListenToThis';
import styles from './Home.scss';

/* eslint-disable react/prop-types */

const Home = () => (
  <div className={styles.columns}>
    <div className={styles.columnA}>
      <Stickies />
    </div>
    <div className={styles.columnB}>

    </div>
  </div>
);

export default Home;
