

const TodoItem = ({ todo, handleDelete, handleUpdate }) => {
  
  return (
    <div className="todo-item" style={{ display: "flex", marginBottom: "8px" }}>
      <h4
        key={todo.id}
        style={{
          padding: "8px 0",
          margin: "0 10px",
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.todo}
      </h4>
      <button onClick={() => handleUpdate(todo.id)}>Update</button>
      <button
        style={{ background: "red", marginLeft: "8px" }}
        onClick={() => handleDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};


export default TodoItem;
