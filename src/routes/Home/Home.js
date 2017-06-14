import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Link } from 'found';
import FragmentContainer from 'decorators/FragmentContainer';
import Archive from 'components/Archive';
import styles from './Home.scss';

const Home = ({ viewer: { readThis, watchThis, listenToThis, stickies } }) =>
  <div className={styles.columns}>
    <div className={styles.columnA}>
      <section className={styles.section}>
        <h3>Latest</h3>
        <Archive posts={stickies} />
      </section>
      <section className={styles.section}>
        <h3>Read This</h3>
        <Archive posts={readThis} />
        <Link to={'/music/read-this'} className={styles.moreIn}>
          More posts in <em>Read This</em> »
        </Link>
      </section>
    </div>
    <div className={styles.columnB}>
      <section className={styles.section}>
        <h3>Watch This</h3>
        <Archive posts={watchThis} />
        <Link to={'/music/watch-this'} className={styles.moreIn}>
          More posts in <em>Watch This</em> »
        </Link>
      </section>
      <section className={styles.section}>
        <h3>Listen to This</h3>
        <Archive posts={listenToThis} />
        <Link to={'/music/listen-to-this'} className={styles.moreIn}>
          More posts in <em>Listen To This</em> »
        </Link>
      </section>
    </div>
  </div>;

Home.propTypes = {
  viewer: PropTypes.shape({
    readThis: PropTypes.object,
    watchThis: PropTypes.object,
    listenToThis: PropTypes.object,
    stickies: PropTypes.object,
  }).isRequired,
};

export default FragmentContainer(graphql`
  fragment Home_viewer on Viewer {
    stickies: posts(sticky: true, first: $stickiesTotal) @connection(key: "Home_stickies") {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
    readThis: posts(category: "read-this", sticky: false, first: $readThisTotal) @connection(key: "Home_readThis") {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
    watchThis: posts(category: "watch-this", first: $watchThisTotal) @connection(key: "Home_watchThis") {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
    listenToThis: posts(category: "listen-to-this", first: $listenToThisTotal) @connection(key: "Home_listenToThis") {
      edges {
        node {
          ...Post_post
        }
        cursor
      }
    }
  }
`)(Home);
