import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Link } from 'found';
import { dateRegex } from 'utils/regex';

export default createFragmentContainer(
  ({ children, post: { slug, date, title: { rendered: title } } }) => {
    const [, year, month, day] = dateRegex.exec(date);
    const url = `/${year}/${month}/${day}/${slug}`;
    if (children) {
      return <Link to={url}>{children}</Link>;
    }
    return <Link to={url} dangerouslySetInnerHTML={{ __html: title }} />;
  },
  graphql`
    fragment PostLink_post on Post {
      slug
      date
      title {
        rendered
      }
    }
  `
);
