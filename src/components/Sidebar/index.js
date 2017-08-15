import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Widget, title, goToThis } from 'wp-styled-components/lib/Sidebar';

/* eslint-disable react/no-danger */

const transformStyles = (classname, html) =>
  html.replace(/widget-title/g, title).replace(/widget_go_to_this/g, goToThis);

const Sidebar = ({ sidebar }) =>
  <ul>
    {sidebar.widgets.map(({ id, classname, content: { rendered: widget } }) =>
      <Widget
        key={id}
        dangerouslySetInnerHTML={{
          __html: transformStyles(classname, widget),
        }}
      />
    )}
  </ul>;

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
        id
        classname
        content {
          rendered
        }
      }
    }
  `
);
