import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Text } from 'react-native';
import { Link } from 'react-router-native';
import { dateRegex } from './utils/regex';

export default createFragmentContainer(
  ({ post, style = null }) => {
    const [, year, month, day] = dateRegex.exec(post.date);
    const url = `/${year}/${month}/${day}/${post.id}`;
    return (
      <Link to={url} underlayColor="#eee">
        <Text style={style}>
          {post.title.raw}
        </Text>
      </Link>
    );
  },
  graphql`
    fragment PostLink_post on Post {
      id
      date
      title {
        raw
      }
    }
  `
);
