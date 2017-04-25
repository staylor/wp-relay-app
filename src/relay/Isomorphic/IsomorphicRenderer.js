import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';

const INACTIVE_READY_STATE = {
  aborted: false,
  done: false,
  error: null,
  ready: false,
  stale: false,
};

export default class IsomorphicRenderer extends React.Component {
  /* eslint-disable react/require-default-props */

  static propTypes = {
    Container: Relay.PropTypes.Container,
    forceFetch: PropTypes.bool,
    initialReadyState: PropTypes.shape({
      aborted: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
      error: PropTypes.any,
      ready: PropTypes.bool.isRequired,
      stale: PropTypes.bool.isRequired,
    }),
    onReadyStateChange: PropTypes.func,
    queryConfig: Relay.PropTypes.QueryConfig.isRequired,
    environment: Relay.PropTypes.Environment,
    render: PropTypes.func,
    shouldFetch: PropTypes.bool,
  };

  static defaultProps = {
    shouldFetch: true,
  };

  constructor(props, context) {
    super(props, context);
    this.mounted = true;
    this.pendingRequest = null;
    this.state = {
      active: !!props.initialReadyState,
      readyState: props.initialReadyState || INACTIVE_READY_STATE,
      // eslint-disable-next-line no-underscore-dangle
      retry: this._retry.bind(this),
    };
  }

  componentDidMount() {
    const { readyState } = this.state;
    if (!readyState || !readyState.done) {
      // eslint-disable-next-line no-underscore-dangle
      this._runQueries(this.props);
    }
  }

  _runQueries({ Container, forceFetch, queryConfig, environment, shouldFetch }) {
    if (!shouldFetch) {
      return;
    }

    let request;
    const querySet = Relay.getQueries(Container, queryConfig);

    const onReadyStateChange = (readyState) => {
      if (!this.mounted) {
        // eslint-disable-next-line no-underscore-dangle
        this._handleReadyStateChange({ ...readyState, mounted: false });
        return;
      }

      if (request !== this.pendingRequest) {
        return;
      }

      if (readyState.aborted || readyState.done || readyState.error) {
        this.pendingRequest = null;
      }

      this.setState({
        active: true,
        readyState,
      });
    };

    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }

    this.pendingRequest = environment[forceFetch ? 'forceFetch' : 'primeCache'](querySet, onReadyStateChange);
    request = this.pendingRequest;
  }

  _retry() {
    const { readyState } = this.state;
    if (readyState && readyState.error) {
      // eslint-disable-next-line no-underscore-dangle
      this._runQueries(this.props);
      this.setState({ readyState: null });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.Container !== this.props.Container) ||
      (nextProps.environment !== this.props.environment) ||
      (nextProps.queryConfig !== this.props.queryConfig) ||
      (nextProps.shouldFetch && !this.props.shouldFetch) ||
      (nextProps.forceFetch && !this.props.forceFetch)
    ) {
      // eslint-disable-next-line no-underscore-dangle
      this._runQueries(nextProps);
      this.setState({ readyState: null });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { readyState } = this.state;
    if (readyState && readyState !== prevState.readyState) {
      // eslint-disable-next-line no-underscore-dangle
      this._handleReadyStateChange({ ...readyState, mounted: true });
    }
  }

  _handleReadyStateChange(readyState) {
    if (this.props.onReadyStateChange) {
      this.props.onReadyStateChange(readyState);
    }
  }

  componentWillUnmount() {
    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }

    this.mounted = false;
  }

  render() {
    const readyState = this.state.active ? this.state.readyState : INACTIVE_READY_STATE;

    return (
      <Relay.ReadyStateRenderer
        Container={this.props.Container}
        environment={this.props.environment}
        queryConfig={this.props.queryConfig}
        readyState={readyState}
        render={this.props.render}
        retry={this.state.retry}
      />
    );
  }
}
