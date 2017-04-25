import PropTypes from 'prop-types';

// Works around issues with context updates failing to propagate.
// Caveat: the context value is expected to never change its identity.
// https://github.com/facebook/react/issues/2517
// https://github.com/reactjs/react-router/issues/470

const contextProviderShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  eventIndex: PropTypes.number.isRequired,
});

function makeContextName(name) {
  return `@@contextSubscriber/${name}`;
}

export default function ContextProvider(name) {
  const contextName = makeContextName(name);
  const listenersKey = `${contextName}/listeners`;
  const eventIndexKey = `${contextName}/eventIndex`;
  const subscribeKey = `${contextName}/subscribe`;

  return {
    childContextTypes: {
      [contextName]: contextProviderShape.isRequired,
    },

    getChildContext() {
      return {
        [contextName]: {
          eventIndex: this[eventIndexKey],
          subscribe: this[subscribeKey],
        },
      };
    },

    componentWillMount() {
      this[listenersKey] = [];
      this[eventIndexKey] = 0;
    },

    componentWillReceiveProps() {
      this[eventIndexKey] += 1;
    },

    componentDidUpdate() {
      this[listenersKey].forEach(listener =>
        listener(this[eventIndexKey])
      );
    },

    [subscribeKey](listener) {
      // No need to immediately call listener here.
      this[listenersKey].push(listener);

      return () => {
        this[listenersKey] = this[listenersKey].filter(item =>
          item !== listener
        );
      };
    },
  };
}
