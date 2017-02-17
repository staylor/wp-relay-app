import React from 'react';
import Relay from 'react-relay';
import Image from '../../components/Image';
import styles from './styles.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */

const Post = ({
  post: {
    id,
    title,
    content,
    author,
    featured_media,
  },
}) => (
  <article>
    <h1 dangerouslySetInnerHTML={{ __html: title.rendered }} />
    {featured_media && <Image image={featured_media} />}
    <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
  </article>
);

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title {
          rendered
        }
        content {
          rendered
        }
        author {
          name
        }
        featured_media {
          ... on Image {
            source_url
          }
          ${Image.getFragment('image')}
        }
      }
    `,
  },
});
