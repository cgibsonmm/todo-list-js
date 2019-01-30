$(document).ready(function(){
  $.getJSON("/api/todos")
  .then(addTodos)

  // Listen for ENTER keypress
  $('#todoInput').keypress(function(event){
    if(event.which == 13){
      createTodo();
    }
  });

  // Listen for UPDATE
  $('.list').on('click', 'li', function(event){
    updateTodo($(this));
  });

  // Listen for DELETE click
  $('.list').on('click', 'span', function(e){
    e.stopPropagation();
    deleteTodo($(this).parent());
  });
});


function addTodos(todos){
  var list = $('.list')
  todos.forEach(function(todo){
    addTodo(todo)
  })
}

function addTodo(todo){
  var newTodo = $('<li class="task">'+ todo.name + '<span>X</span></li>')
  newTodo.data({id: todo._id, name: todo.name, completed: todo.completed})
  if(todo.completed){
    newTodo.addClass('done')
  }
  $('.list').append(newTodo)
}

function createTodo(){
  var usrInput = $('#todoInput').val()
  $.post('/api/todos', {name: usrInput})
  .then(function(newTodo){
    $('#todoInput').val('')
    addTodo(newTodo)
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateTodo(todo) {
  var todoUrl = 'api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  console.log(updateData)
  $.ajax({
    method: 'PUT',
    url: todoUrl,
    data: updateData,
  })
  .then(function(updatedTodo){
    todo.toggleClass('done')
    todo.data('completed', isDone);
  })
}

function deleteTodo(todo){
  var thisTodoId = todo.data('id');
  var todoName = todo.data('name');
  var deleteUrl = '/api/todos/' + thisTodoId

  todo.remove();
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(){
    console.log('deleted: ' + todoName )
  })
  .catch(function(err){
    console.log(err)
  })
}
