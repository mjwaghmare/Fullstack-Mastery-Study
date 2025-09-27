import React from "react";
import TodoForm from "./components/TodoForm";
import { useEffect, useState } from "react";
import todoApis from "./api/todoApis";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoStatus, setTodoStatus] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  /// fetch all todos
  useEffect(() => {
    const fetchTodos = async () => {
      /// fetch all todos
      const todos = await todoApis.fetchTodos();
      /// set the todos
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  /// add todo
  const handleAddTodo = async (e) => {
    /// this will prevent the form from submitting and refreshing the page
    e.preventDefault();
    /// if the todo is empty, return
    if (!newTodo.trim()) return;
    try {
      /// add todo
      const res = await todoApis.addTodo(newTodo);
      /// add todo to the beginning of the todos array
      setTodos([res, ...todos]);

      /// clear the input
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  /// handle update
  const handleUpdate = (id) => {
    try {
      console.log(todoStatus);

      setTodoStatus((todos[id].completed = !todos[id].completed));
    } catch (err) {
      console.error(err);
    }
  };

  /// delete todo
  const handleDelete = async (id) => {
    try {
      /// delete todo using the id
      await todoApis.deleteTodo(id);

      /// remove the todo from the todos array
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          content: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Todo App</h1>
        <TodoForm
          handleAddTodo={handleAddTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />

        <div style={{ textAlign: "left", marginTop: 20 }}>
          {todos.map((t) =>
            TodoItem({
              todo: t,
              handleDelete: handleDelete,
              handleUpdate: handleUpdate,
            })
          )}
        </div>
      </div>
    </>
  );
};

export default App;
