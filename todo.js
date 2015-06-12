angular.module('todoApp', [])
    .controller('TodoListController', function () {
        var todoList = this;
        //todoList.todos = [
        //    {text: 'learn angular', done: true},
        //    {text: 'build an angular app', done: false}];
        todoList.todos = [];
        todoList.todos = angular.fromJson(localStorage.getItem("todos"));
        if (todoList.todos == null) {
            todoList.todos = [];
        }

        todoList.addTodo = function () {
            if (todoList.todoText == undefined || todoList.todoText == '') {
                alert("Entry should not be empty!");
            } else {
                todoList.todos.push({text: todoList.todoText, done: false});
                todoList.todoText = '';

                localStorage.setItem("todos", angular.toJson(todoList.todos));
            }
        };

        todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function () {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
            localStorage.setItem("todos", angular.toJson(todoList.todos));
        };

        todoList.delete = function (todo) {
            var r = window.confirm("Do you really want to delete this entry?");
            if (r == true) {
                var index = todoList.todos.indexOf(todo);
                if (index != -1) {
                    todoList.todos.splice(index, 1);
                }
                localStorage.setItem("todos", angular.toJson(todoList.todos));
            }
        }

    });