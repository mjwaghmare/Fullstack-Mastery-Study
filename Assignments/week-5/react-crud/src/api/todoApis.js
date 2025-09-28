import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

/// Fetch todos
async function fetchTodos(limit = 5) {
  const res = await api.get("/todos", { params: { limit } });
  return res.data.todos;
}

/// Add todo
async function addTodo(todoText, userId = 1) {
  const res = await api.post("/todos/add", {
    todo: todoText,
    completed: false,
    userId,
  });
  return res.data;
}

/// Update todo (toggle completed)
async function updateTodo(id, updates = {}) {
  const res = await api.patch(`/todos/${id}`, updates);
  return res.data;
}

/// Delete todo
async function deleteTodo(id) {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
}

export default {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
