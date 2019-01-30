var db = require('../models')


// GET index
exports.getTodos = function(req, res) {
  db.Todo.find()
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(err) {
      res.send(err);
    });
}

// POST new
exports.createTodos = function(req, res) {
  db.Todo.create(req.body)
    .then(function(newTodo) {
      res.status(201).json(newTodo)
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.showTodo = function(req, res) {
  db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
      res.json(foundTodo);
    });
}

exports.updateTodo =  function(req, res) {
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo){
    res.send(todo);
  })
  .catch(function(err){
    res.send(err)
  });
}

exports.deleteTodo =  function(req, res){
  db.Todo.deleteOne({_id: req.params.todoId})
  .then(function(){
    res.json({message: 'Deleted todo item'})
  })
  .catch(function(err){
    res.send(err)
  })
}

module.exports = exports;
