import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { routerShape } from 'found/lib/PropTypes';
import { ThemeProvider } from 'wp-styled-components/lib/App';
import 'wp-styled-components/lib/global';
import FragmentContainer from 'decorators/FragmentContainer';
import IntlProvider from 'decorators/IntlProvider';
import AppComponent from 'components/App';

@FragmentContainer(graphql`
  fragment App_viewer on Viewer {
    settings {
      title
      description
      language
    }
    navMenu(id: $menuID) {
      id
      name
      items {
        id
        title
        url
        parent
        order
        type
        typeName
        typeSlug
        dataSlug
        dataID
      }
    }
    sidebar(id: $sidebarID) {
      widgets {
        id
        classname
        content {
          rendered
        }
      }
    }
  }
`)
@IntlProvider
export default class App extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      settings: PropTypes.object,
      navMenu: PropTypes.object,
      sidebar: PropTypes.object,
    }).isRequired,
    children: PropTypes.node,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  static childContextTypes = {
    router: routerShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.removeTransitionHook = props.router.addTransitionHook(this.onTransition);
  }

  componentWillUnmount() {
    this.removeTransitionHook();
  }

  onTransition = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  getChildContext() {
    return {
      router: this.props.router,
    };
  }

  render() {
    const { viewer: { settings, navMenu, sidebar }, children } = this.props;

    return (
      <ThemeProvider>
        <AppComponent {...{ settings, navMenu, sidebar }}>
          {children}
        </AppComponent>
      </ThemeProvider>
    );
  }
}
