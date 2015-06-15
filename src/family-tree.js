'use strict';

var FamilyTree = function(name){
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(child){

  if ( !(child instanceof FamilyTree) ) {
    throw new Error('child must be an instance of FamilyTree!');
  }

  this.children.push(child);
};

FamilyTree.prototype.build = function(json){

  var children = json[this.name];
  var descendents;

  if (!children) {
    return this;
  }

  for (var child in children) {
    child = new FamilyTree(child);
    descendents = child.build(children);
    this.addChild(descendents);
  }

  return this;
};

FamilyTree.prototype.traverse = function(iterator){

  iterator(this);

  if (!this.children){
    return;
  }

  this.children.forEach( function(child) {
    child.traverse(iterator);
  });
};

FamilyTree.prototype.filter = function(condition){

  var output = [];

  this.traverse(function(member){
    if (condition(member)) {
      output.push(member);
    }
  });

  return output;
};

FamilyTree.prototype.find = function(name){
  return this.filter(function(member){
    return member.name === name;
  })[0];
};

FamilyTree.prototype.getParentOf = function(target){

  return this.filter( function(member){

    var isParent = false;

    if (!member.hasOwnProperty('children')){
      return false;
    }

    member.children.forEach( function(child){
      if (child.name === target){
        isParent = true;
      }
    });

    return isParent;
  })[0]; //since only one parent node is allowed

};

FamilyTree.prototype.getGrandParentOf = function(member) {

  var grandparent;
  var parent = this.getParentOf(member);

  if (!parent) {
    return null;
  }

  grandparent = this.getParentOf(parent.name);

  if (!grandparent){
    return null;
  }

  return grandparent.name;
};

FamilyTree.prototype.getAllChildlessMembers = function(){
  return this.filter( function(member){

    if (!member.hasOwnProperty('children')){
      return true;
    }

    return !member.children.length;
  }).map( function(member) {
    return member.name;
  });
};

FamilyTree.prototype.getAllOnlyChilds = function(){

  // filter collection to parents with a single child
  return this.filter( function(member){
    if ( !member.hasOwnProperty('children') ){
      return false;
    }
    return member.children.length === 1;

  // map collection to the only childs
  }).map(function(member){
    return member.children[0];

  // add root to collection
  }).concat(this)

  // return the collection as a collection of names
    .map( function(member){
      return member.name;
    });
};

FamilyTree.prototype.numChildren = function(){
  if (!this.children){
    return 0;
  }
  return this.children.length;
};

FamilyTree.prototype.numGrandChildren = function(){
  if (!this.children){
    return 0;
  }
  return this.children.reduce( function(total, child) {
    total += child.numChildren();
    return total;
  }, 0);
};

FamilyTree.prototype.largestNumGrandChildren = function(){

  var largest = 0;
  var output = null;

  this.traverse( function(member){
    var numGrandChildren = member.numGrandChildren();
    if (largest < numGrandChildren){
      largest = numGrandChildren;
      output = member.name;
      return;
    }
  });

  return output;
};

module.exports = FamilyTree;
