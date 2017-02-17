import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Image from '../../components/Image';
import styles from './styles.scss';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

const Home = ({ relay, posts: { results: { edges } } }) => (
  <section>
    {edges.map(({ node: { id, title, author, featured_media } }) => (
      <div key={id}>
        <h3 className={styles.title}>
          <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </h3>
        {featured_media && <Image image={featured_media} />}
        <p className={styles.paragraph}>
          {author.name}
        </p>
      </div>
    ))}
    <button onClick={() => relay.setVariables({ total: relay.variables.total + 10 })}>
      MORE
    </button>
  </section>
);

export default Relay.createContainer(Home, {
  initialVariables: {
    total: 10,
  },
  fragments: {
    posts: () => Relay.QL`
      fragment on PostCollection {
        results(first: $total) {
          edges {
            node {
              id
              title {
                rendered
              }
              author {
                name
              }
              featured_media {
                ${Image.getFragment('image')}
              }
            }
            cursor
          }
        }
      }
    `,
  },
});
