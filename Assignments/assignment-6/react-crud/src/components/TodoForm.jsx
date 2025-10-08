import React from "react";

const TodoForm = ({ handleAddTodo, newTodo, setNewTodo }) => {

  return (
    <form
      onSubmit={handleAddTodo}
      style={{
        display: "flex",
        maxWidth: "500px",
        marginBottom: "16px",
        justifyContent: "space-between",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
    
        type="text"
        placeholder="Add a todo"
        style={{
          flex: 1,
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "8px",
        }}
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
