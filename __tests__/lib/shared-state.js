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

test('Setter it was generated execute without path.', () => {
  const shareState = new SharedState();
  const setState = shareState.generateSetState();
  setState({test: true});
  expect(shareState.state).toMatchSnapshot();
});
