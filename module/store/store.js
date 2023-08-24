class Store {
  constructor() {
    if(!Store.instance) {
      this.page = 'common';
      this.tool = null;
      Store.instance = this;
    }
    return Store.instance;
  }

  getStore() {
    return {
      page: this.page,
      tool: this.tool
    }
  }
  setStore(property, value) {
    this[property] = value
  }
}


export default Store;
