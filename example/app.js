require('@babel/polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const {useSharedState} = require('../');

const {useEffect} = React;

const FormA = props => {
  const [state, setState] = useSharedState('a', 'value a');

  const onChange = e => {
    setState(e.target.value);
  };

  useEffect(() => {
    console.log(`effect A: ${state}`);
  });

  return (
    <div {...props}>
      <h2>Form A</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputAddress">state.a</label>
            <input type="text" className="form-control" value={state} onChange={onChange}/>
          </div>
        </div>
      </form>
    </div>
  );
};

const FormB = props => {
  const [state, setState] = useSharedState('b', 'value b');
  const onChange = e => {
    setState(e.target.value);
  };

  useEffect(() => {
    console.log(`effect B: ${state}`);
  });

  return (
    <div {...props}>
      <h2>Form B</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputAddress">state.b</label>
            <input type="text" className="form-control" value={state} onChange={onChange}/>
          </div>
        </div>
      </form>
    </div>
  );
};

const FormC = props => {
  const [state, setState] = useSharedState();

  const onChangeA = e => {
    setState(Object.assign({}, state, {a: e.target.value}));
  };

  const onChangeB = e => {
    setState(Object.assign({}, state, {b: e.target.value}));
  };

  useEffect(() => {
    console.log(`effect C: ${JSON.stringify(state)}`);
  });

  return (
    <div {...props}>
      <h2>Form C</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputAddress">state.a</label>
            <input type="text" className="form-control" value={state.a} onChange={onChangeA}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">state.b</label>
            <input type="text" className="form-control" value={state.b} onChange={onChangeB}/>
          </div>
        </div>
      </form>
    </div>
  );
};

ReactDOM.render(
  (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/react-hooks-shared-state">react-hooks-shared-state</a>
      </nav>
      <div className="container pt-3">
        <div className="row">
          <FormA className="col"/>
          <FormB className="col"/>
          <FormC className="col"/>
        </div>
      </div>
    </>
  ),
  document.getElementById('root')
);
