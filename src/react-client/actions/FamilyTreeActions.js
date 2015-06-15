import { alt } from '../alt';

class FamilyTreeActions {

  updateData(data) {
    this.dispatch(data);
  }

  fetchData() {
    this.dispatch();
  }
}

export default alt.createActions(FamilyTreeActions);
