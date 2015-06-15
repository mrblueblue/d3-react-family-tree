'use strict';

var util = require('util');

var Tree = require('../src/family-tree');
var NancyFamily = require('../src/nancy-family-json');
var Nancy = new Tree('Nancy');
var NancyFamilyTree = Nancy.build(NancyFamily.tree);

var childless = stringifyList(NancyFamilyTree.getAllChildlessMembers());
var onlyChilds = stringifyList(NancyFamilyTree.getAllOnlyChilds());
var mostGrandChildren = NancyFamilyTree.largestNumGrandChildren();

process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log('\n\tWELCOME TO NANCY\'S FAMILY TREE\n');

printTree(NancyFamilyTree);
console.log('\n');

console.log('\tHere are some stats:\n');
console.log('\t* ' + childless + ' do not have any children');
console.log('\t* ' + onlyChilds + ' do not have any siblings');
console.log('\t* ' + mostGrandChildren + ' has the most grandchildren\n');
console.log('\twho\'s grandparent would you like to search?\n');

process.stdin.on('data', function (text) {

  var inputName = util.inspect(text);
  inputName = inputName.substring(1, inputName.length - 3);
  var grandparent = NancyFamilyTree.getGrandParentOf(inputName);

  if (text === 'quit\n') {

    done();

  } else if ( !inputName ) {

    console.log('\n\tPlease enter something!\n');

  } else if ( inputName[0] !== inputName[0].toUpperCase() ) {

    console.log('\n\tPlease capitalize proper nouns!');

  } else if (!NancyFamilyTree.find(inputName)) {

    console.log('\n\t' + inputName + ' is not in Nancy\'s family!\n');

  } else if (!grandparent) {

    console.log('\n\t' + inputName + ' does not have a grandparent!\n');

  } else {

    console.log('\n\t' + inputName + '\'s grandparent is ' + grandparent + '\n');
  }
});

function done() {
  console.log('Good-bye!');
  process.exit();
}

function stringifyList(collection){
  var tmp = ' ' + collection.pop();
  collection.push('and');
  return collection.join(', ') + tmp;
}

function printTree(node, depth){

  depth = depth || 0;

  var indent = '';
  var range = new Array(depth);

  // if we are not at root
  if (depth){

    // iterate through number of depths
    for (var i = 0; i < range.length; i++){

      // if at even depth and
      // if iteration number is equal to second to last
      if ( range.length % 2 === 0 && i === range.length - 1) {
        // add pipe symbol at beginning
        indent += '|  ';
      } else {
        // add spaces
        indent += '   ';
      }
    }
    // having added necessary symbols and spaces
    // add another pipe
    indent += '|';
  }

  // then, we will iterate through number of depths
  for (var j = 0; j < range.length; j++){
    // and add spaces after the pipe
    indent += '___';
  }

  console.log('\t' + indent + node.name);

  // base case
  if (!node.children){
    return;
  }

  // for each of the node's children, recursively print
  node.children.forEach( function(child) {
    depth++;
    printTree(child, depth);
    depth--;
  });
}
