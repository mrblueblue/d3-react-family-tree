import { alt } from '../alt';
import FamilyTreeActions from '../actions/FamilyTreeActions';

import { tree } from '../../nancy-family-json';
import Tree from '../../family-tree';

let NancyFamilyTree = new Tree('Nancy');
let treeData = NancyFamilyTree.build(tree);

class FamilyTreeStore {

  constructor() {
    this.data = treeData;

    this.bindListeners({
      handleUpdateData: FamilyTreeActions.UPDATE_DATA,
      handleFetchData: FamilyTreeActions.FETCH_DATA
    });
  }

  handleUpdateData(data) {
    this.data = data;
  }

  handleFetchData() {
    this.data = null;
  }

}

export default alt.createStore(FamilyTreeStore, 'FamilyTreeStore');
