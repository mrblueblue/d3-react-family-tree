'use strict';

var FamilyTree = function(name){
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(child){
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

module.exports = FamilyTree;
