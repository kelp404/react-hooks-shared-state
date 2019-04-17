# react-hooks-shared-state
A global state for React with Hooks API.

## Installation
```bash
$ npm install react-hooks-shared-state --save
```

## Live demo
[https://kelp404.github.io/react-hooks-shared-state](https://kelp404.github.io/react-hooks-shared-state)

## Quick start
```js
const {useSharedState} = require('react-hooks-shared-state');

const Component = () => {
  const [state, setState] = useSharedState(null, {value: 'hello'});
  const onChange = e => {
    setState(Object.assign({}, state, {value: e.target.value}));
  };

  return (
    <input value={state.value} onChange={onChange}/>
  );
};
```

## Document
### Syntactic sugar
```js
const {useSharedState} = require('react-hooks-shared-state');
```
```js
const sharedState = require('react-hooks-shared-state');
sharedState.useState()
```
`useSharedState` and `sharedState.useState` are the same one.

### useSharedState(path, initialState)
### Parameter `path`
Type: `string`  
Required: `optional`  
The object path of the state.  
When the path is null it will return the state(root).  
If you just want to use a part of state in the component, pass the object path.

### Parameter `initialState`
Type: `any`  
Required: `optional`  
The initial state.
