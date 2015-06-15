'use strict';

import React from 'react';

export class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      input: '',
      message: null
    };
  }

  render(){

    let family = this.props.data;
    let mostGrandChildren = family.largestNumGrandChildren();
    let childless = family.getAllChildlessMembers();
    let onlyChilds = family.getAllOnlyChilds();

    return (
      <div style={{fontFamily: 'Avenir', fontSize: 14}}>
        <p>{mostGrandChildren} has the most grandchildren</p>
        <p>These members have no children:</p>
        <ul>
        {
          childless.map( function(value){
            return ( <li>{value}</li> );
          })
        }
        </ul>
        <p>These members have no siblings:</p>
        <ul>
        {
          onlyChilds.map( function(value){
            return ( <li>{value}</li> );
          })
        }
        </ul>
        <p>Enter a name to find the person's grandparent</p>
        <form onSubmit={this.handleSubmit.bind(this)} >
         <input
          style={{fontFamily: 'Avenir', fontSize: 14}}
          value={this.state.input} type='text'
          onChange={this.handleChange.bind(this)} />
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }

  handleChange(e) {
    this.setState({input: e.target.value.substr(0, 140)});
  }

  handleSubmit(e){

    e.preventDefault();

    let family = this.props.data;
    let name = this.state.input;

    // check if capitalized
    if (name[0] !== name[0].toUpperCase()) {
      this.setState({
        message: 'Please capitalize proper nouns!',
        input: ''
      });

    //check if in family
    } else if ( !family.find(name) ){
      this.setState({
        message: `${name} is not in the family!`,
        input: ''
      });

    } else {
      let grandparent = family.getGrandParentOf(name);
      let message = grandparent ? `${name}'s grandparent is ${grandparent}.` : `${name} has no grandparent!`;
      this.setState({
        message: message,
        input: ''
      });
    }
  }
}
