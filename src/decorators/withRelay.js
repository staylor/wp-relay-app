import Relay from 'react-relay';

export const withRelay = spec => component => Relay.createContainer(component, spec);

// re-export Relay as default for convenience
export default Relay;
