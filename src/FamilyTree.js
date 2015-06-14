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

};

FamilyTree.prototype.filter = function(condition){

};

FamilyTree.prototype.find = function(name){

};

module.exports = FamilyTree;
