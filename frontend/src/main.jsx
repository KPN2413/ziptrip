import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './api.js';
import './styles.css';

const emptyForm = { title: '', description: '', priority: 'medium', dueDate: '' };

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  }), [todos]);

  async function loadTodos() {
    try {
      setLoading(true);
      setError('');
      const data = await api.getTodos({ search, status });
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(loadTodos, 250);
    return () => clearTimeout(timer);
  }, [search, status]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  async function submitTodo(event) {
    event.preventDefault();
    try {
      setError('');
      if (editingId) await api.updateTodo(editingId, form);
      else await api.createTodo(form);
      setForm(emptyForm);
      setEditingId(null);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  }

  function editTodo(todo) {
    setEditingId(todo.id);
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function toggleTodo(id) {
    await api.toggleTodo(id);
    await loadTodos();
  }

  async function deleteTodo(id) {
    const confirmed = window.confirm('Delete this todo?');
    if (!confirmed) return;
    await api.deleteTodo(id);
    await loadTodos();
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Ziptrrip Developer Assignment</p>
        <h1>Todo List</h1>
        <p>React multi-page frontend connected to Node.js and Express CRUD APIs.</p>
      </section>

      <section className="card stats-grid">
        <div><strong>{stats.total}</strong><span>Total</span></div>
        <div><strong>{stats.active}</strong><span>Active</span></div>
        <div><strong>{stats.completed}</strong><span>Completed</span></div>
      </section>

      <section className="card">
        <h2>{editingId ? 'Edit Todo' : 'Add Todo'}</h2>
        <form className="todo-form" onSubmit={submitTodo}>
          <input name="title" value={form.title} onChange={updateField} placeholder="Todo title" required />
          <textarea name="description" value={form.description} onChange={updateField} placeholder="Description" rows="3" />
          <div className="form-row">
            <select name="priority" value={form.priority} onChange={updateField}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input name="dueDate" value={form.dueDate} onChange={updateField} type="date" />
          </div>
          <div className="button-row">
            <button type="submit">{editingId ? 'Update Todo' : 'Create Todo'}</button>
            {editingId && <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search todos" />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </section>

      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">Loading todos...</p>}

      <section className="todo-list">
        {!loading && todos.length === 0 && <p className="muted">No todos found.</p>}
        {todos.map(todo => (
          <article className={`todo-card ${todo.completed ? 'done' : ''}`} key={todo.id}>
            <div>
              <div className="todo-title-row">
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <h3>{todo.title}</h3>
              </div>
              <p>{todo.description || 'No description added.'}</p>
              <div className="chips">
                <span>{todo.priority} priority</span>
                {todo.dueDate && <span>Due: {todo.dueDate}</span>}
                <span>{todo.completed ? 'Completed' : 'Active'}</span>
              </div>
            </div>
            <div className="actions">
              <a href={`/todo.html?id=${todo.id}`}>View</a>
              <button type="button" className="secondary" onClick={() => editTodo(todo)}>Edit</button>
              <button type="button" className="danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<TodoListPage />);
