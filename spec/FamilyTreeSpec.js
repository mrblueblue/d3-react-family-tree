'use strict';
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.min.js', 'utf-8');
var d3 = fs.readFileSync('node_modules/d3/d3.min.js', 'utf-8');
var bundle = fs.readFileSync('src/www/bundle.js', 'utf-8');

var FamilyTree = require('../src/FamilyTree');
var NancyFamily = require('../src/NancyFamily');
var Nancy = new FamilyTree('Nancy');
var NancyFamilyTree = Nancy.build(NancyFamily.tree);

describe('Main Objectives', function(){

  describe('Input/Output Behavior', function(){

    it('should take a name as input and output the grandparents name', function(){
      expect(NancyFamilyTree.getGrandParentOf('Kevin')).toEqual('Nancy');
    });

    it('should print the names of people with no siblings', function(){
      expect(NancyFamilyTree.getAllOnlyChilds()).toEqual(['Kevin', 'Mary', 'Nancy']);
    });

    it('should print the names of people with no children', function(){
      var membersWithNoChildren = ['Adam', 'Samuel', 'Catherine', 'Joseph', 'Aaron', 'Patrick', 'Robert', 'Mary'];
      expect(NancyFamilyTree.getAllChildlessMembers().sort()).toEqual(membersWithNoChildren.sort());
    });

    it('should print the name of the person with largest number of grand children', function(){
      expect(NancyFamilyTree.largestNumGrandChildren()).toEqual('Jill');
    });
  });

  describe('Tree Visualization', function(){

    var d3TreeNodes = [];
    var dyPosition = {};

    beforeEach(function(done){
      jsdom.env({
        html: '<html><body></body></html>',
        src: [jquery, d3, bundle],
        done: function(err, window) {

          window.$('.node').each( function(index, element){

            var node = window.$(element);
            var nodeName = node.find('text').text();
            var nodeYPosition = node.attr('transform').match(/\,(.*)/)[1];
            nodeYPosition = parseInt(nodeYPosition.substring(0, nodeYPosition.length - 1));

            d3TreeNodes.push(nodeName);
            dyPosition[nodeName] = nodeYPosition;
          });

          done();
        }
      });
    });

    it('should correctly visualize all members of the Nancy family', function(){

      expect(d3TreeNodes.sort()).toEqual(NancyFamily.roster.sort());

      expect(dyPosition.Nancy < dyPosition.Jill
        && dyPosition.Jill < dyPosition.Mary).toEqual(true);

      expect(dyPosition.James === dyPosition.George
        && dyPosition.George === dyPosition.Samuel).toEqual(true);
    });
  });
});

describe('FamilyTree class', function() {

  var Aaron = new FamilyTree('Aaron');

  describe('constructors', function(){

    it('should have a name property', function(){
      expect(Aaron.hasOwnProperty('name')).toEqual(true);
    });

    it('should have a children property', function(){
      expect(Aaron.hasOwnProperty('children')).toEqual(true);
    });

    describe('name property', function(){

      it('should be initialized to passed in name argument', function(){
        expect(Aaron.name).toEqual('Aaron');
      });
    });

    describe('children property', function(){

      it('should be initialized an empty array', function(){
        expect(Aaron.children.length).toEqual(0);
      });
    });
  });

  describe('class methods', function(){

    var Bob = new FamilyTree('Bob');
    var Bill = new FamilyTree('Bill');

    describe('addChild function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('addChild')).toEqual(true);
      });

      it('should add a new child to the children array', function(){
        Bob.addChild(Bill);
        expect(Bob.children.length).toEqual(1);
        expect(Bob.children[0]).toEqual(Bill);
      });
    });

    describe('build function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('build')).toEqual(true);
      });

      it('should take a json object and build a family tree from it', function(){

        var Bobby = new FamilyTree('Bobby');
        var json = {
          'Bobby': {
            'Bill': null,
            'Byron': {
              'Bo': null
            }
          }
        };

        Bobby.build(json);
        expect(Bobby.children.length).toEqual(2);
        expect(Bobby.children[1].name).toEqual('Byron');
        expect(Bobby.children[1].children[0]).toEqual(new FamilyTree('Bo'));
      });
    });

    describe('traverse function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('traverse')).toEqual(true);
      });

      it('should traverse entire family tree and apply an iterator to each member', function(){
        var called = [];
        NancyFamilyTree.traverse(function(member){
          called.push(member.name);
        });
        expect(called.sort()).toEqual(NancyFamily.roster.sort());
      });

    });

    describe('filter function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('filter')).toEqual(true);
      });

      it('should return a collection of members that meet a condition', function(){

        var collection = NancyFamilyTree.filter( function(member){
          return member.children.length === 2;
        }).map( function(member) {
          return member.name;
        });

        expect(collection).toEqual(['Carl', 'George']);
      });
    });

    describe('find function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('find')).toEqual(true);
      });

      it('should find the member in the family tree given the name', function(){
        expect(NancyFamilyTree.find('Samuel').name).toEqual('Samuel');
        expect(NancyFamilyTree.find('Samuel').children).toEqual([]);
      });
    });

    describe('getParentOf function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('getParentOf')).toEqual(true);
      });

      it('should find the parent of a given name', function(){
        expect( NancyFamilyTree.getParentOf('Samuel').name ).toEqual('Kevin');
      });
    });

    describe('getGrandParentOf function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('getGrandParentOf')).toEqual(true);
      });

      it('should find the grandparent of a given name', function(){
        expect(NancyFamilyTree.getGrandParentOf('Samuel')).toEqual('Jill');
      });
    });

    describe('getAllChildlessMembers function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('getAllChildlessMembers')).toEqual(true);
      });

      it('should return a collection member names who have no children', function(){
        var membersWithNoChildren = ['Adam', 'Samuel', 'Catherine', 'Joseph', 'Aaron', 'Patrick', 'Robert', 'Mary'];
        expect(NancyFamilyTree.getAllChildlessMembers().sort()).toEqual(membersWithNoChildren.sort());
      });
    });

    describe('getAllOnlyChilds function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('getAllOnlyChilds')).toEqual(true);
      });

      it('should return a collection member names who have no siblings', function(){
        expect(NancyFamilyTree.getAllOnlyChilds()).toEqual(['Kevin', 'Mary', 'Nancy']);
      });
    });

    describe('numChildren function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('numChildren')).toEqual(true);
      });

      it('should return the number of children for a given root member', function(){

        var Alice = new FamilyTree('Alice');

        ['Henry', 'Steven', 'Harold'].forEach( function(person) {
          Alice.addChild(new FamilyTree(person));
        });

        expect(Alice.numChildren()).toEqual(3);
      });
    });

    describe('numGrandChildren function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('numGrandChildren')).toEqual(true);
      });

      it('should return the number of grandchildren for a given root member', function(){
        var James = new FamilyTree('James');
        var John = new FamilyTree('John');
        var Jacob = new FamilyTree('Jacos');
        John.addChild(Jacob);
        James.addChild(John);
        expect(James.numGrandChildren()).toEqual(1);
        expect(John.numGrandChildren()).toEqual(0);
      });
    });

    describe('largestNumGrandChildren function', function(){

      it('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('largestNumGrandChildren')).toEqual(true);
      });

      it('should return the name of the person who has the most grandchildren', function(){
        expect(NancyFamilyTree.largestNumGrandChildren()).toEqual('Jill');
      });
    });
  });
});
