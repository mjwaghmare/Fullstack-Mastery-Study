import React from "react";
import TodoForm from "./components/TodoForm";
import { useEffect, useState } from "react";
import todoApis from "./api/todoApis";
import TodoItem from "./components/TodoItem";
import SearchTodo from "./components/SearchTodo";

const App = () => {
  const [todos, setTodos] = useState([]);

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

  // Update todo
  const handleUpdate = async (id) => {
  try {
    const todoToUpdate = todos.find((t) => t.id === id);
    const newCompletedStatus = !todoToUpdate.completed;
    
    await todoApis.updateTodo(id, { completed: newCompletedStatus });
    
    const updatedTodo = { ...todoToUpdate, completed: newCompletedStatus };
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
  } catch (err) {
    console.error("Update error:", err);
    
    // If it's a 404 error, locally update
    if (err.response?.status === 404) {
      console.log("Todo not found on server, updating locally only");
      const todoToUpdate = todos.find((t) => t.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  }
};
// const handleUpdate = async (id) => {
//   try {
//     const todoToUpdate = todos.find((t) => t.id === id);
//     const newCompletedStatus = !todoToUpdate.completed;
    
//     // Send only the completed field
//     await todoApis.updateTodo(id, { completed: newCompletedStatus });
    
//     // Update local state
//     const updatedTodo = { ...todoToUpdate, completed: newCompletedStatus };
//     setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
//   } catch (err) {
//     console.error(err);
//   }
// };

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

  const handleSearch = async (searchTerm) => {
    console.log("Search term:", searchTerm);
    
    try {
      const todos = await todoApis.fetchTodos();
      const filteredTodos = todos.filter((t) =>
        t.todo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTodos(filteredTodos);
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
        <SearchTodo handleSearch={handleSearch}/>

        <div style={{ textAlign: "left", marginTop: 20 }}>
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
