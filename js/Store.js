//class for save items in array and logic
export class Store {
  constructor() {
    this.arrayItems = [];
    this.countId = -1;
  }
  create(item) {
    this.arrayItems = [...this.arrayItems, item];
    return this.arrayItems;
  }
  check(id) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].id === +id) {
        if (this.arrayItems[i].checked === false) {
          this.arrayItems[i].checked = true;
        } else if (this.arrayItems[i].checked === true) {
          this.arrayItems[i].checked = false;
        }
      }
    }
  }
  delete(id) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].id === +id) {
        // itemsArray.splice(i,1);
        this.arrayItems[i].deleted = true;
      }
    }
  }
  change(id) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].id === +id) {
        this.arrayItems[i].editing = true;
      }
    }
  }
  editing(id, chengedName) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].id === +id) {
        this.arrayItems[i].editing = false;
        if (chengedName !== undefined) {
          this.arrayItems[i].name = chengedName;
        }
      }
    }
  }
  counter() {
    this.countId++;
    return this.countId;
  }
}
