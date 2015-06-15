# family-tree

A FamilyTree class in Javascript.

### Running Locally

```javascript
npm install
npm start
```

To see the tree visualization, open the file src/www/index.html in a browser.

### Overview

The FamilyTree class accepts name and returns an instance with a `name` property as the given name and a `children` property as an empty array.

The FamilyTree class has the following methods:

* `FamilyTree.prototype.addChild`
* `FamilyTree.prototype.traverse`
* `FamilyTree.prototype.filter`
* `FamilyTree.prototype.find`
* `FamilyTree.prototype.getParentOf`
* `FamilyTree.prototype.getGrandParentOf`
* `FamilyTree.prototype.getAllOnlyChilds`
* `FamilyTree.prototype.getAllChildlessMembers`
* `FamilyTree.prototype.numChildren`
* `FamilyTree.prototype.numGrandChildren`
* `FamilyTree.prototype.largestNumGrandChildren`

### Tools

* Task Runner - *Gulp*
* Testing - *Jasmine*, *jsdom*
* Linting - *eslint*
* Bundling - *Webpack*
* Data Visualization - *D3*
