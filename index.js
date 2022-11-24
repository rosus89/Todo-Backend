const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const path = require('path');

const Todo = require('./models/todo');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));

const PORT = 8081;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let createTodo = async (value) => await new Todo({
    value,
    created: Date.now(),
    completed: false

}).save()


app.get('/', async (req, res) => {
    const todos = await Todo.find({})
    res.render('todos', {todos})
})


app.post('/', async (req, res) => {
    await createTodo(req.body.todo)
    const todos = await Todo.find({})
    res.render('todos', {todos})
})

app.route('/remove/:id').get((req, res) => {
     Todo.findByIdAndDelete(req.params.id, err => {
        if (err) return res.send(404, err);
        res.redirect("/");
        });
    
})

app.route('/edit/:id').get((req, res) => {
    Todo.find({}, (err, todo) => {
    res.render("todos/edit", { todos: todo, id: req.params.id })})})
    .post((req, res) => {
    Todo.findByIdAndUpdate(req.params.id, { value: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
})



app.use( (req, res, next)=>{
    let err = new Error("Page not found!")
    err.status = 404
    next(err)
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

