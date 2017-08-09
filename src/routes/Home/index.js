import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Link } from 'found';
import { css } from 'glamor';
import Archive from 'components/Archive';
import styles from './styles';

const Home = ({ viewer: { readThis, watchThis, listenToThis, stickies } }) =>
  <div className={css(styles.columns)}>
    <div className={css(styles.columnA)}>
      <section className={css(styles.section)}>
        <h2 className={css(styles.header)}>Latest</h2>
        <Archive posts={stickies} />
      </section>
      <section className={css(styles.section)}>
        <h2 className={css(styles.header)}>Read This</h2>
        <Archive posts={readThis} />
        <Link to={'/music/read-this'} className={css(styles.moreIn)}>
          More posts in <em>Read This</em> »
        </Link>
      </section>
    </div>
    <div className={css(styles.columnB)}>
      <section className={css(styles.section)}>
        <h2 className={css(styles.header)}>Watch This</h2>
        <Archive posts={watchThis} />
        <Link to={'/music/watch-this'} className={css(styles.moreIn)}>
          More posts in <em>Watch This</em> »
        </Link>
      </section>
      <section className={css(styles.section)}>
        <h2 className={css(styles.header)}>Listen to This</h2>
        <Archive posts={listenToThis} />
        <Link to={'/music/listen-to-this'} className={css(styles.moreIn)}>
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

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_viewer on Viewer {
      stickies: posts(sticky: true, first: $stickiesTotal) {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
      }
      readThis: posts(category: "read-this", sticky: false, first: $readThisTotal) {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
      }
      watchThis: posts(category: "watch-this", first: $watchThisTotal) {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
      }
      listenToThis: posts(category: "listen-to-this", first: $listenToThisTotal) {
        edges {
          node {
            ...Post_post
          }
          cursor
        }
      }
    }
  `
);
