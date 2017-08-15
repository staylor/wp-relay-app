import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  PageWrapper,
  Content,
  Primary,
  Secondary,
} from 'wp-styled-components/lib/App';
import 'wp-styled-components/lib/global';
import Settings from 'components/Settings';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';

export default function App({ settings, navMenu, sidebar, children }) {
  return (
    <ThemeProvider>
      <PageWrapper>
        <Settings settings={settings} />
        <Header {...{ settings, navMenu }} />
        <Content>
          <Primary>
            {children}
          </Primary>
          <Secondary>
            <Sidebar sidebar={sidebar} />
          </Secondary>
        </Content>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}

App.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  settings: PropTypes.object.isRequired,
  navMenu: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
