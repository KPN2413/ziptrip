import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './api.js';
import './styles.css';

function TodoDetailsPage() {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState('');
  const id = new URLSearchParams(window.location.search).get('id');

  async function loadTodo() {
    try {
      if (!id) throw new Error('Todo id query parameter is missing');
      const data = await api.getTodo(id);
      setTodo(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleStatus() {
    const updated = await api.toggleTodo(id);
    setTodo(updated);
  }

  useEffect(() => {
    loadTodo();
  }, [id]);

  return (
    <main className="page">
      <a className="back-link" href="/">Back to todo list</a>
      <section className="hero">
        <p className="eyebrow">Single Todo Page</p>
        <h1>Todo Details</h1>
        <p>This page reads todo id from the query parameter.</p>
      </section>

      {error && <p className="error">{error}</p>}
      {!error && !todo && <p className="muted">Loading todo...</p>}

      {todo && (
        <article className="card detail-card">
          <div className="todo-title-row">
            <input type="checkbox" checked={todo.completed} onChange={toggleStatus} />
            <h2>{todo.title}</h2>
          </div>
          <p>{todo.description || 'No description added.'}</p>
          <dl>
            <div><dt>Priority</dt><dd>{todo.priority}</dd></div>
            <div><dt>Status</dt><dd>{todo.completed ? 'Completed' : 'Active'}</dd></div>
            <div><dt>Due date</dt><dd>{todo.dueDate || 'Not added'}</dd></div>
            <div><dt>Created at</dt><dd>{new Date(todo.createdAt).toLocaleString()}</dd></div>
            <div><dt>Updated at</dt><dd>{new Date(todo.updatedAt).toLocaleString()}</dd></div>
          </dl>
        </article>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<TodoDetailsPage />);
