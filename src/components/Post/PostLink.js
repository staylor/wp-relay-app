import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Link } from 'found';
import ContentNode from 'components/ContentNode';
import { dateRegex } from 'utils/regex';

export default createFragmentContainer(
  ({ children, post: { id, date, title: { data: title } } }) => {
    const [, year, month, day] = dateRegex.exec(date);
    const url = `/${year}/${month}/${day}/${id}`;
    if (children) {
      return (
        <Link to={url}>
          {children}
        </Link>
      );
    }
    return <ContentNode component={Link} to={url} content={title} />;
  },
  graphql`
    fragment PostLink_post on Post {
      id
      date
      title {
        data {
          ...ContentNode_content
        }
      }
    }
  `
);
