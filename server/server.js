const http = require("http");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS,DELETE",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://VasiliyBuriy:forWorkVB2001@cluster0.6qwii.mongodb.net/todo-items?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;
const Task = new Schema({
  name: String,
  checked: Boolean,
  deleted: Boolean,
  editing: Boolean,
  id: Number,
});
const Model = mongoose.model;
const Item = Model("todo-items", Task);

let todos = [];
Item.find().then((res) => {
  todos = res;
});

http
  .createServer((req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {
      case "/todos":
        const result = JSON.stringify(todos);
        res.end(result);
        break;
      case "/create":
        let bodyCreate = "";
        req.on("data", (chunk) => {
          bodyCreate += chunk;
          bodyCreate = JSON.parse(bodyCreate);
          bodyCreate.id = new Date();
          todos.push(bodyCreate);
          const Todo = new Item({
            name: bodyCreate.name,
            checked: bodyCreate.checked,
            deleted: bodyCreate.deleted,
            editing: bodyCreate.editing,
            id: bodyCreate.id,
          });

          Todo.save((err, result) => {
            if (err) console.log(err);
            console.log(result);
          });
        });
        req.on("end", () => {
          console.log(bodyCreate);
        });
        res.end("create");
        break;

        
      case "/delete":
        let bodyDelete = "";
        req.on("data", (chunk) => {
          bodyDelete += chunk;
          bodyDelete = JSON.parse(bodyDelete);

          for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === +bodyDelete.id) {
              // itemsArray.splice(i,1);
              todos[i].deleted = true;
              Item.update({ id: todos[i].id }, { deleted: true }).then((doc) =>
                console.log(JSON.stringify(doc))
              );
            }
          }
        });
        req.on("end", () => {
          console.log(todos);
        });
        res.end("delete");
        break;


      case "/checked":
        let bodyChecked = "";
        req.on("data", (chunk) => {
          bodyChecked += chunk;
          bodyChecked = JSON.parse(bodyChecked);

          for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === +bodyChecked.id) {
              if (todos[i].checked === false) {
                Item.update({ id: todos[i].id }, { checked: true }).then(
                  (doc) => console.log(JSON.stringify(doc))
                );
                todos[i].checked = true;
              } else if (todos.checked === true) {
                Item.update({ id: todos[i].id }, { checked: false }).then(
                  (doc) => console.log(JSON.stringify(doc))
                );
                todos[i].checked = false;
              }
            }
          }
        });

        req.on("end", () => {
          console.log(bodyChecked.id);
        });
        res.end("checked");
        break;


      case "/editing":
        let bodyEditing = "";
        req.on("data", (chunk) => {
          bodyEditing += chunk;
          bodyEditing = JSON.parse(bodyEditing);
          for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === +bodyEditing.id) {
              todos[i].editing = true;
              Item.update({ id: todos[i].id }, { editing: true }).then((doc) =>
                console.log(JSON.stringify(doc))
              );
            }
          }
        });

        req.on("end", () => {
          console.log(bodyEditing);
        });
        res.end("editing");
        break;


      case "/change":
        let bodyChange = "";
        req.on("data", (chunk) => {
          bodyChange += chunk;
          bodyChange = JSON.parse(bodyChange);

          for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === +bodyChange.id) {
              todos[i].editing = false;
              Item.update({ id: todos[i].id }, { editing: false }).then((doc) =>
                console.log(JSON.stringify(doc))
              );
              if (bodyChange.name !== undefined) {
                todos[i].name = bodyChange.name;
                Item.update(
                  { id: todos[i].id },
                  { name: bodyChange.name }
                ).then((doc) => console.log(JSON.stringify(doc)));
              }
            }
          }
        });

        req.on("end", () => {
          console.log("bodyChange");
        });
        res.end("Changed");
        break;
    }
  })
  .listen(3000);
