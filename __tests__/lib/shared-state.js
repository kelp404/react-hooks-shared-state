const React = require('react');
const renderer = require('react-test-renderer');
const SharedState = require('../../lib/shared-state');

test('setState() is assign state and call setters.', () => {
  const shareState = new SharedState();
  shareState.setters = [
    {
      path: 'test',
      set: jest.fn()
    },
    {
      set: jest.fn()
    }
  ];
  shareState.setState({test: true});
  expect(shareState.state).toMatchSnapshot();
  expect(shareState.setters[0].set).toBeCalledWith(true);
  expect(shareState.setters[1].set).toBeCalledWith({test: true});
});

test('Setter call setState() without path.', () => {
  const shareState = new SharedState();
  const setState = shareState.generateSetState();
  jest.spyOn(shareState, 'setState');
  setState({test: true});
  expect(shareState.state).toMatchSnapshot();
  expect(shareState.setState).toBeCalledWith({test: true});
});

test('Setter assign a partial state and call setters with path.', () => {
  const shareState = new SharedState();
  const setState = shareState.generateSetState('test');
  shareState.setters = [
    {
      path: 'test',
      set: jest.fn()
    },
    {
      set: jest.fn()
    }
  ];
  setState(true);
  expect(shareState.state).toMatchSnapshot();
  expect(shareState.setters[0].set).toBeCalledWith(true);
  expect(shareState.setters[1].set).toBeCalledWith({test: true});
});

test('Call useState() to get the state and the setter.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  shareState.setState({test: true});
  const component = () => {
    const [state, setState] = shareState.useState();
    expect(state).toMatchSnapshot();
    if (state.test) {
      setState({test: false});
    }

    return React.createElement('div', null);
  };

  renderer.create(React.createElement(component, null));
  expect(shareState.useState).toBeCalledTimes(2);
});

test('Call useState() with a initial state to get the state.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  const component = () => {
    const [state] = shareState.useState(null, {test: true});
    expect(state).toMatchSnapshot();
    return React.createElement('div', null);
  };

  renderer.create(React.createElement(component, null));
  expect(shareState.useState).toBeCalled();
});

test('Call useState() with a path to get the state and the setter.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  shareState.setState({other: true});
  const component = () => {
    const [state, setState] = shareState.useState('test', true);
    expect(state).toMatchSnapshot();
    if (state) {
      setState(false);
    }

    return React.createElement('div', null);
  };

  renderer.create(React.createElement(component, null));
  expect(shareState.useState).toBeCalledTimes(2);
});

test('Call useState() with a path and a initial partial state to get the state.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  const component = () => {
    const [state] = shareState.useState('test', true);
    expect(state).toMatchSnapshot();
    return React.createElement('div', null);
  };

  renderer.create(React.createElement(component, null));
  expect(shareState.useState).toBeCalled();
});

test('Call useState() twice to make sure it did not assign setter again.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  shareState.setState({test: true});
  const component = () => {
    const [state] = shareState.useState();
    expect(state).toMatchSnapshot();
    return React.createElement('div', null);
  };

  renderer.create(React.createElement(component, null));
  renderer.create(React.createElement(component, null));
  expect(shareState.useState).toBeCalled();
});

test('Call the setter of useState() to update the different part.', () => {
  const shareState = new SharedState();
  jest.spyOn(shareState, 'useState');
  const childComponent = () => {
    const [state] = shareState.useState('test.child', true);
    expect(state).toMatchSnapshot();
    return React.createElement('div', null);
  };

  const parentComponent = () => {
    const [state, setState] = shareState.useState('testX');
    expect(state).toMatchSnapshot();
    if (!state) {
      setState({child: false});
    }

    return React.createElement('div', null);
  };

  renderer.create(React.createElement(childComponent, null));
  renderer.create(React.createElement(parentComponent, null));
  expect(shareState.state).toMatchSnapshot();
});
