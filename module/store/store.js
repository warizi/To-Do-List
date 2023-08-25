class Store {
  constructor() {
    if(!Store.instance) {
      this.page = 'common';
      this.tool = null;
      this.week = [];
      Store.instance = this;
    }
    return Store.instance;
  }

  getStore() {
    return {
      page: this.page,
      tool: this.tool,
      week: [...this.week],
    }
  }
  setStore(property, value) {
    if(Array.isArray(value)) {
      this[property] = [...value];
      return;
    }
    if(property === 'week') {
      if(!Array.isArray(value)) {
        return;
      }
    }
    this[property] = value;
  }
}


export default Store;
