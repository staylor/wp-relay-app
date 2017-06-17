import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import styles from './Sidebar.scss';

/* eslint-disable react/no-danger */

const transformStyles = (classname, html) => {
  if (classname === 'widget_go_to_this') {
    return html
      .replace(/widget-title/g, styles.title)
      .replace(/widget_go_to_this/g, styles.goToThis);
  }
  return html;
};

const Sidebar = ({ sidebar }) => {
  let i = 0;
  const key = () => {
    i += 1;
    return `widget-${i}`;
  };

  return (
    <ul className={styles.widgets}>
      {sidebar.widgets.map(({ classname, content: { rendered: widget } }) =>
        <li
          key={key()}
          dangerouslySetInnerHTML={{
            __html: transformStyles(classname, widget),
          }}
        />
      )}
    </ul>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.shape({
    widgets: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default createFragmentContainer(
  Sidebar,
  graphql`
    fragment Sidebar_sidebar on Sidebar {
      widgets {
        classname
        content {
          rendered
        }
      }
    }
  `
);
