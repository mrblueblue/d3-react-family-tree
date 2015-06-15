'use strict';

import React from 'react';
import renderTree from '../utils/renderTree';

export class FamilyTree extends React.Component {

  constructor(){
    super();
  }

  componentDidMount() {
    let mountNode = React.findDOMNode(this);
    renderTree(this.props.data, mountNode);
  }

  render(){
    return (
      <svg></svg>
    );
  }
}
