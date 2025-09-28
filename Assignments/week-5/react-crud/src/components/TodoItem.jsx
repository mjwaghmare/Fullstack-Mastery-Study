const TodoItem = ({ todo, handleDelete, handleUpdate }) => {
  return (
    <div
      className="todo-item"
      style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}
    >
      <h4
        style={{
          padding: "8px 0",
          margin: "0 10px",
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      >
        {todo.todo}
      </h4>
      <button
        onClick={() => {
          console.log("Button clicked for ID:", todo.id);

          return handleUpdate(todo.id);
        }}
        style={{
          background: "blue",
          marginLeft: "8px",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button
        onClick={() => handleDelete(todo.id)}
        style={{
          background: "#dc3545",
          marginLeft: "8px",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
