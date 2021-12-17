//class for create todo-object
import { store } from "./index.js";
export class Todo {
  constructor(
    name,
    checked = false,
    deleted = false,
    id = store.counter(),
    editing = false
  ) {
    this.name = name;
    this.checked = checked;
    this.deleted = deleted;
    this.id = id;
    this.editing = editing;
  }
}
