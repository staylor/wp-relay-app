import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import ReactRelayFragmentMockRenderer from 'react-relay/lib/ReactRelayFragmentMockRenderer';
import RelayModernMockEnvironment from 'RelayModernMockEnvironment';
import App from '../';

test('Test example', () => {
  const mockViewer = {
    settings: {},
    navMenu: {},
    sidebar: {},
  };

  const instance = ReactTestRenderer.create(
    <ReactRelayFragmentMockRenderer
      environment={RelayModernMockEnvironment.createMockEnvironment()}
      render={() => <App viewer={mockViewer} />}
    />
  );

  expect(instance.toJSON()).toMatchSnapshot();
});
