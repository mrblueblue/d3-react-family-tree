import React from 'react';
import FamilyTreeStore from './stores/FamilyTreeStore';
import { FamilyTree } from './components/FamilyTree';
import { Dashboard } from './components/Dashboard';

class App extends React.Component {

  constructor(){
    super();
    this.state = FamilyTreeStore.getState();
  }

  componentDidMount() {
    FamilyTreeStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    FamilyTreeStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render(){
    return (
      <div style={{display: 'flex', flex: 1, flexDirectin: 'row'}}>
        <FamilyTree data={this.state.data} />
        <Dashboard data={this.state.data} />
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);
