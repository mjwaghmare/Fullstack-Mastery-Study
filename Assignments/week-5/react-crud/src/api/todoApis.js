// src/api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/**
 * Fetch todos (returns array of todo objects)
 * default limit is 150 to attempt to grab a large set; adjust as needed.
 * DummyJSON returns { todos, total, skip, limit } — we return the todos array.
 */
export async function fetchTodos(limit = 5, skip = 0) {
  const res = await api.get('/todos', { params: { limit, skip } });
  return res.data.todos;
}

/**
 * Other helper API functions (complete CRUD) kept in same file for future steps.
 * These are fully implemented and ready to use.
 */

export async function fetchTodoById(id) {
  const res = await api.get(`/todos/${id}`);
  return res.data; // single todo object
}

export async function addTodo(todoText, userId = 1) {
  const res = await api.post('/todos/add', {
    todo: todoText,
    completed: false,
    userId,
  });
  return res.data; 
}

export async function updateTodo(id, updates = {}) {
  // PUT (full) but DummyJSON supports PUT / PATCH behavior; using PUT here
  const res = await api.put(`/todos/${id}`, updates);
  return res.data; // { isUpdated: true, ...}
}

export async function deleteTodo(id) {
  const res = await api.delete(`/todos/${id}`);
  return res.data; // { isDeleted: true, ...}
}

export default {
  fetchTodos,
  fetchTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
