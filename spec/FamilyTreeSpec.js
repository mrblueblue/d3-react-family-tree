'use strict';

var FamilyTree = require('../src/FamilyTree');
// var NancyFamily = require('../src/NancyFamily');

describe('FamilyTree class', function() {

  var family = new FamilyTree('Aaron');

  describe('constructors', function(){

    it('should have a name property', function(){
      expect(family.hasOwnProperty('name')).toEqual(true);
    });

    it('should have a children property', function(){
      expect(family.hasOwnProperty('children')).toEqual(true);
    });

    describe('name property', function(){

      it('should be initialized to passed in name argument', function(){
        expect(family.name).toEqual('Aaron');
      });
    });

    describe('children property', function(){

      it('should be initialized an empty array', function(){
        expect(family.children.length).toEqual(0);
      });
    });
  });

});
