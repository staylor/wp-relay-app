import React from 'react';
import Relay from 'react-relay';
import styles from './styles.scss';

/* eslint-disable react/prop-types */

const Home = ({ posts }) => (
  <section>
    {posts.map(({ title, author }) => (
      <div>
        <h3>{title.rendered}</h3>
        <p className={styles.paragraph}>
          {author.name}
        </p>
      </div>
    ))}
  </section>
);

export default Relay.createContainer(Home, {
  fragments: {
    posts: () => Relay.QL`
      fragment on Post {
        title {
          rendered
        }
        author {
          name
        }
      }
    `,
  },
});
