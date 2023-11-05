import React, { Component } from 'react';

const lazyLoader = (importComp: () => Promise<{ default: React.ComponentType<any> }>) => {
  return class extends Component<any, { component: React.ComponentType<any> | null }> {
    constructor(props: any) {
      super(props);
      this.state = {
        component: null, // initializing state
      };
    }

    // loading the component and setting it to state
    async componentDidMount() {
      const comp = await importComp();
      this.setState({ component: comp.default });
    }

    // rendering the component
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default lazyLoader;
