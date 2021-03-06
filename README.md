![alt tag](https://raw.github.com/mrblueblue/family-tree/master/front-end-screenshot.png)

# family-tree

A FamilyTree class in Javascript.

### Running Locally

```javascript
npm install
npm start
```
The start script will lint, build, test, and then open up a little command-line program. To exit this program enter `quit` or just `CTRL+C` out.

To see the tree visualization, open the file `src/www/index.html` in your browser. Make sure that the `bundle.js` has been built before opening the html file. To manually build use the command `gulp build`.

To start development mode use the command `gulp`

### Overview

The FamilyTree class accepts a name and returns an instance with a `name` property as the given name and a `children` property as an empty array.

The FamilyTree class has the following methods:

#### `FamilyTree.prototype.addChild`
Accepts a FamilyTree instance and adds it to the `children` array of the parent.

#### `FamilyTree.prototype.traverse`
Accepts an iterator function and applys the iterator to every node member of the FamilyTree.

#### `FamilyTree.prototype.filter`
Accepts a condition function, which accepts a member node and returns a boolean. The ultimate output is a collection of the names of every member that passes the condition.

#### `FamilyTree.prototype.find`
Accepts a name and returns the member node that has a matching name.

#### `FamilyTree.prototype.getParentOf`
Accepts a name and returns the parent of the named member node.

#### `FamilyTree.prototype.getGrandParentOf`
Accepts a name and returns the grandparent of the named member node.

#### `FamilyTree.prototype.getAllOnlyChilds`
Returns a collection of all the names of members with no children in the FamilyTree instance.

#### `FamilyTree.prototype.getAllChildlessMembers`
Returns a collection of all the names of members with no siblings in the FamilyTree instance.

#### `FamilyTree.prototype.numChildren`
Returns the number of children the root node member has in the FamilyTree instance.

#### `FamilyTree.prototype.numGrandChildren`
Returns the number of grandchildren the root node member has in the FamilyTree instance.

#### `FamilyTree.prototype.largestNumGrandChildren`
Returns the name of the member node who has the most grandchildren in the FamilyTree instance.

### Tools

* Front-End - *D3*, *React*, *Alt/Flux*
* Testing - *Jasmine*, *jsdom*
* Task Runner - *Gulp*
* Linting - *eslint*
* Transpiler - *Babel*
* Bundling - *Webpack*

