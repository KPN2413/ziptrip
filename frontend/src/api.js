const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      message = data.error || message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getTodos: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/todos${query ? `?${query}` : ''}`);
  },
  getTodo: id => request(`/todos/${id}`),
  createTodo: todo => request('/todos', { method: 'POST', body: JSON.stringify(todo) }),
  updateTodo: (id, todo) => request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(todo) }),
  toggleTodo: id => request(`/todos/${id}/toggle`, { method: 'PATCH' }),
  deleteTodo: id => request(`/todos/${id}`, { method: 'DELETE' })
};
