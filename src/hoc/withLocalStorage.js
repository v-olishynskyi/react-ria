import React from "react";

const withLocalStorage = (WrapperComponent) => {
  return class WithLS extends React.Component {
    state = {
      localStorageAvailable: false,
    };

    componentDidMount() {
      this.checkLocalStorageExists();
    }

    checkLocalStorageExists() {
      const testKey = "test";

      try {
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        this.setState({ localStorageAvailable: true });
      } catch (error) {
        this.setState({ localStorageAvailable: false });
      }
    }

    load = (key) => {
      if (this.state.localStorageAvailable) {
        return localStorage.getItem(key);
      }
      return null;
    };

    save = (key, data) => {
      if (this.state.localStorageAvailable) {
        localStorage.setItem(key, data);
      }
    };

    remove = (key) => {
      if (this.state.localStorageAvailable) {
        localStorage.removeItem(key);
      }
    };

    render() {
      return (
        <WrapperComponent load={this.load} save={this.save} remove={this.remove} {...this.props} />
      );
    }
  };
};

export default withLocalStorage;
