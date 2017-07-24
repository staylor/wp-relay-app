import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { css } from 'glamor';
import styles from './styles';

/* eslint-disable react/no-danger */

const transformStyles = (classname, html) =>
  html
    .replace(/widget-title/g, css(styles.title))
    .replace(/widget_go_to_this/g, css(styles.goToThis));

const Sidebar = ({ sidebar }) =>
  <ul className={css(styles.widgets)}>
    {sidebar.widgets.map(({ id, classname, content: { rendered: widget } }) =>
      <li
        className={css(styles.widget)}
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
