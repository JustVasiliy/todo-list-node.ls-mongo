const http = require('http');
const url = require("url");
const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS,DELETE",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  } 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://VasiliyBuriy:forWorkVB2001@cluster0.6qwii.mongodb.net/todo-items?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const Task = new Schema({
name : String,
checked: Boolean,
deleted: Boolean,
editing:Boolean,
id: Number
});
const Model = mongoose.model;
const Item = Model('todo-items',Task);
const Todo = new Item({name : 'test', checked: false, deleted:false, editing:false, id:1 });
// Todo.save((err,result)=>{
//     if(err) console.log(err)
//     console.log(result);
// });
// const todos = []
// const routing = {
//     '/create':(req,res) => {console.log('привет', `${req.method}, ${res}`)}
// }
// const types = {
//     function:(fn, req,res) => JSON.stringify(fn(req,res))
// }
http.createServer((req, res)=>{
    // const data = routing[req.url]
    // const type = typeof data
    // const serializer = types[type]
    // const result = serializer(data,req,res)
    // res.end(result)
    // res.writeHead(200, {
    //     "Content-Type":"application/json"
    // })
    res.writeHead(200, defaultHeaders);
    let urlParse = url.parse(req.url);
    console.log(urlParse)
    if(req.method === "GET"){
        switch(urlParse.pathname){
            case "/":
                create(req,res);
                break;
        }
    }
    
}).listen(3000);

function create(req, res){

    res.end(req.method)
}