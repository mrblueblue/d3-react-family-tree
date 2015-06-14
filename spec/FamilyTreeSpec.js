'use strict';

var FamilyTree = require('../src/FamilyTree');
var NancyFamily = require('../src/NancyFamily');
// var Nancy = new FamilyTree('Nancy');
// var NancyFamilyTree = Nancy.build(NancyFamily);

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
          'Bob': {
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

      xit('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('traverse')).toEqual(true);
      });

      xit('should traverse entire family tree and apply an iterator to each member', function(){

      });

    });

    describe('filter function', function(){

      xit('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('filter')).toEqual(true);
      });

      xit('should return a collection of members that meet a condition', function(){

      });

    });

    describe('find function', function(){

      xit('should exist on FamilyTree prototype', function(){
        expect(FamilyTree.prototype.hasOwnProperty('find')).toEqual(true);
      });

      xit('should find the member in the family tree given the name', function(){

      });

    });

  });

});
