import { Todo } from "./Todo.js";
import { EventEmitter } from "./EventEmitter.js";
import { Render } from "./Render.js";
import { RenderMainForm } from "./RenderMainForm.js";
import { Store } from "./Store.js";

const renderMainForm = new RenderMainForm();
export let store = new Store();
let reRender = new Render(store);
const emitter = new EventEmitter();
emitter.on("todosChanged",() => reRender.render());
//render main form
renderMainForm.render();

const btnCreate = document.querySelector(".btnCreate");
const inputCreateName = document.querySelector(".inputCreateName");
const listItems = document.querySelector(".listItems");

btnCreate.addEventListener("click",() => {
  if (inputCreateName.value.trim() !== "") {
    store.create(new Todo(inputCreateName.value));
    emitter.emit("todosChanged");
  }
  inputCreateName.value = "";
});

inputCreateName.addEventListener("keydown",(event) => {
  if (event.keyCode === 13) {
    if (inputCreateName.value.trim() !== "") {
      store.create(new Todo(inputCreateName.value));
      emitter.emit("todosChanged");
    }
    inputCreateName.value = "";
  } 
});

//listeners
listItems.addEventListener("click",(event) => {
  if (event.target.className === "check") {
    let id = event.target.parentElement.getAttribute("id");
    store.check(id);
    emitter.emit("todosChanged");
  } else if (event.target.className === "delete") {
    let id = event.target.parentElement.parentElement.getAttribute("id");

    store.delete(id);
    emitter.emit("todosChanged");
  } else if (event.target.className === "change") {
    let id = event.target.parentElement.parentElement.getAttribute("id");
    const inputChange = event.target.parentElement.parentElement.children[0];

    store.change(id);

    emitter.emit("todosChanged");
  } else if (event.target.className === "saveBtn") {
    let id = event.target.parentElement.parentElement.getAttribute("id");
    const inputChange = event.target.parentElement.parentElement.children[0];
    let newName = inputChange.value;
    if (newName.trim() !== "") {
      store.editing(id, newName);
    }

    emitter.emit("todosChanged");
  }
});
//Keydown for inputChange
listItems.addEventListener("keydown", (event) => {
  let id = event.target.parentElement.getAttribute("id");
  if (event.keyCode === 13) {
    const inputChange = event.target;
    let newName = inputChange.value;
    if (newName.trim() !== "") {
      store.editing(id, newName);
    }
    emitter.emit("todosChanged");
  } else if (event.keyCode === 27) {
    let newName = undefined;
    store.editing(id, newName);
    emitter.emit("todosChanged");
  }
});

const test = fetch('http://127.0.0.1:3000/')
.then(res=> console.log(res))

test