import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { readTodos, writeTodos } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

function cleanTodoInput(body) {
  return {
    title: String(body.title || '').trim(),
    description: String(body.description || '').trim(),
    priority: body.priority === 'high' || body.priority === 'medium' || body.priority === 'low' ? body.priority : 'medium',
    dueDate: body.dueDate ? String(body.dueDate) : '',
    completed: Boolean(body.completed)
  };
}

function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ziptrrip-todo-api' });
});

app.get('/api/todos', async (req, res, next) => {
  try {
    let todos = await readTodos();
    const search = String(req.query.search || '').toLowerCase().trim();
    const status = String(req.query.status || 'all');

    if (search) {
      todos = todos.filter(todo =>
        todo.title.toLowerCase().includes(search) ||
        todo.description.toLowerCase().includes(search)
      );
    }

    if (status === 'completed') todos = todos.filter(todo => todo.completed);
    if (status === 'active') todos = todos.filter(todo => !todo.completed);

    res.json(todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    next(error);
  }
});

app.get('/api/todos/:id', async (req, res, next) => {
  try {
    const todos = await readTodos();
    const todo = todos.find(item => item.id === req.params.id);
    if (!todo) return sendError(res, 404, 'Todo not found');
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

app.post('/api/todos', async (req, res, next) => {
  try {
    const input = cleanTodoInput(req.body);
    if (!input.title) return sendError(res, 400, 'Title is required');

    const now = new Date().toISOString();
    const todo = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now
    };

    const todos = await readTodos();
    todos.push(todo);
    await writeTodos(todos);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

app.put('/api/todos/:id', async (req, res, next) => {
  try {
    const todos = await readTodos();
    const index = todos.findIndex(item => item.id === req.params.id);
    if (index === -1) return sendError(res, 404, 'Todo not found');

    const input = cleanTodoInput({ ...todos[index], ...req.body });
    if (!input.title) return sendError(res, 400, 'Title is required');

    todos[index] = {
      ...todos[index],
      ...input,
      updatedAt: new Date().toISOString()
    };

    await writeTodos(todos);
    res.json(todos[index]);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/todos/:id/toggle', async (req, res, next) => {
  try {
    const todos = await readTodos();
    const todo = todos.find(item => item.id === req.params.id);
    if (!todo) return sendError(res, 404, 'Todo not found');

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    await writeTodos(todos);
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/todos/:id', async (req, res, next) => {
  try {
    const todos = await readTodos();
    const remaining = todos.filter(item => item.id !== req.params.id);
    if (remaining.length === todos.length) return sendError(res, 404, 'Todo not found');

    await writeTodos(remaining);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => sendError(res, 404, 'Route not found'));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
