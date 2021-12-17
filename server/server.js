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
let id = -1;
const Todo = new Item({
  name: "test",
  checked: false,
  deleted: false,
  editing: false,
  id: 1,
});
let example = [{ test: "test" }];
// Todo.save((err,result)=>{
//     if(err) console.log(err)
//     console.log(result);
// });
const todos = [];

const routing = {
  "/todos": () => {
    return todos;
  },
//   "/create": () => {
//     return todos;
//   },
//   "/delete": () => {
//     return todos;
//   },
//   "/checked": () => {
//     return todos;
//   },
};
const types = {
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};
http
  .createServer((req, res) => {
    res.writeHead(200, defaultHeaders);
    switch (req.url) {
      case "/todos":
        const data = routing[req.url];
        const type = typeof data;
        const serializer = types[type];
        const result = serializer(data, req, res);
  
        res.end(result);
        break;
      case "/create":
        let bodyCreate = "";
        req.on("data", (chunk) => {
            
            bodyCreate += chunk;
            bodyCreate = JSON.parse(bodyCreate);
            bodyCreate.id = ++id;
          todos.push(bodyCreate);
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
            }
          }
        });
        req.on("end", () => {
          console.log(todos[bodyDelete.id]);
        });
        res.end("delete");
        break;
      case "/checked":
          let bodyChecked ='';
          req.on('data', (chunk)=>{
              bodyChecked += chunk;
              bodyChecked = JSON.parse(bodyChecked);
              for (let i = 0; i < todos.length.length; i++) {
                if (todos.length[i].id === +bodyChecked.id) {
                  if (todos.length[i].checked === false) {
                    todos.length[i].checked = true;
                  } else if (todos.length[i].checked === true) {
                    todos.length[i].checked = false;
                  }
                }
              }
          });
          //ВЫВОДИТ В КОНСОЛЬ UNDERFINDE!!!!!!
          req.on("end", () => {
            console.log(bodyChecked.id);
          });
          res.end("checked");
        break;
      case "/change":
        break;
    }
    
  })
  .listen(3000);
