const objectPath = require('object-path');
const {useState} = require('react');

module.exports = class SharedState {
  constructor() {
    this.state = undefined;
    this.setters = [];
    this.setState = this.setState.bind(this);
    this.generateSetState = this.generateSetState.bind(this);
    this.useState = this.useState.bind(this);
  }

  setState(value) {
    /*
    Assign a new stateful value.
    @param value {any}
     */
    this.state = value;
    this.setters.forEach(setter => {
      if (setter.path) {
        setter.set(objectPath.get(this.state, setter.path));
      } else {
        setter.set(this.state);
      }
    });
  }

  generateSetState(path) {
    /*
    Generate a function to set state.
    @param path {String|null}
    @returns {Function (value) => {}}
     */
    return value => {
      if (path) {
        if (this.state === undefined) {
          this.state = {};
        }

        this.state = Object.assign({}, this.state);
        objectPath.set(this.state, path, value);
        // Call all match setters.
        this.setters.forEach(setter => {
          if (setter.path) {
            if (path.indexOf(setter.path) === 0 || setter.path.indexOf(path) === 0) {
              setter.set(objectPath.get(this.state, setter.path));
            }
          } else {
            // This setter is for state root.
            setter.set(this.state);
          }
        });
      } else { // Path is empty or null.
        // This setter is for state root.
        this.state = value;
        // Call all setters because the root was updated.
        this.setters.forEach(setter => {
          if (setter.path) {
            setter.set(objectPath.get(this.state, setter.path));
          } else {
            setter.set(this.state);
          }
        });
      }
    };
  }

  useState(path, initialState) {
    /*
    Returns a stateful value, and a function to update it.
    @param path {String|null} The object path.
    @param initialState {any}
    @returns {Array<[{state: any}, {setState: Function}]>}
     */
    path = path == null ? '' : `${path}`;
    let sharedState = objectPath.get(this.state, path);
    if (sharedState === undefined && initialState !== undefined) {
      sharedState = initialState;
      if (path) {
        if (this.state === undefined) {
          this.state = {};
        }

        objectPath.set(this.state, path, sharedState);
      } else {
        // State root.
        this.state = sharedState;
      }
    }

    const [state, set] = useState(sharedState);
    if (!this.setters.find(x => x.set === set)) {
      this.setters.push({path, set});
    }

    return [state, this.generateSetState(path)];
  }
};
