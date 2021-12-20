import { Render } from "./Render.js";
import { RenderMainForm } from "./RenderMainForm.js";
import { Store } from "./Store.js";

const renderMainForm = new RenderMainForm();
export let store = new Store();
let reRender = new Render(store);

//render main form
renderMainForm.render();

const btnCreate = document.querySelector(".btnCreate");
const inputCreateName = document.querySelector(".inputCreateName");
const listItems = document.querySelector(".listItems");

btnCreate.addEventListener("click", () => {
  if (inputCreateName.value.trim() !== "") {
    takeAPI("create", "POST", {
      name: inputCreateName.value.trim(),
      checked: false,
      deleted: false,
      editing: false,
    });
    waitAllTodos();
  }
  inputCreateName.value = "";
});
inputCreateName.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    if (inputCreateName.value.trim() !== "") {
      takeAPI("create", "POST", {
        name: inputCreateName.value.trim(),
        checked: false,
        deleted: false,
        editing: false,
      });
      waitAllTodos();
    }
    inputCreateName.value = "";
  }
});

//listeners
listItems.addEventListener("click", (event) => {
  if (event.target.className === "check") {
    let id = event.target.parentElement.getAttribute("id");
    takeAPI("checked", "POST", { id: id });
    waitAllTodos();
  } else if (event.target.className === "delete") {
    let id = event.target.parentElement.parentElement.getAttribute("id");
    takeAPI("delete", "DELETE", { id: id });
    waitAllTodos();
  } else if (event.target.className === "change") {
    let id = event.target.parentElement.parentElement.getAttribute("id");

    takeAPI("editing", "POST", { id: id });

    waitAllTodos();
  } else if (event.target.className === "saveBtn") {
    let id = event.target.parentElement.parentElement.getAttribute("id");
    const inputChange = event.target.parentElement.parentElement.children[0];
    let newName = inputChange.value;
    if (newName.trim() !== "") {
      takeAPI("change", "POST", { name: newName, id: id });
    }
    waitAllTodos();
  }
});
//Keydown for inputChange
listItems.addEventListener("keydown", (event) => {
  let id = event.target.parentElement.getAttribute("id");
  if (event.keyCode === 13) {
    const inputChange = event.target;
    let newName = inputChange.value;
    if (newName.trim() !== "") {
      takeAPI("change", "POST", { name: newName, id: id });
    }
    waitAllTodos();
  } else if (event.keyCode === 27) {
    let newName = undefined;
    takeAPI("change", "POST", { name: newName, id: id });
    waitAllTodos();
  }
});

const callAPI = async () => {
  const url = "http://127.0.0.1:3000/todos";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = fetch(url, options);
  try {
    return (await response).json();
  } catch (error) {
    console.log(error);
  }
};
const takeAPI = async (route, method, obj) => {
  const url = `http://127.0.0.1:3000/${route}`;
  const options = {
    method: `${method}`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  const response = fetch(url, options);
  try {
    console.log(method);
  } catch (error) {
    console.log(error);
  }
};
let backStore;
const getAllTodos = async (obj) => {
  let storeNode = new Store();
  storeNode.create(obj);
  backStore = new Render(storeNode);
  backStore.render();
};
const waitAllTodos = async () => {
  return getAllTodos(await callAPI());
};

waitAllTodos();
