# API Documentation

Base URL:

```bash
http://localhost:4000/api
```

## GET /health

Returns API health status.

## GET /todos

Returns all todos.

Optional query parameters:

- `search`: searches title and description
- `status`: `all`, `active`, or `completed`

Example:

```bash
GET /api/todos?status=active&search=assignment
```

## GET /todos/:id

Returns one todo by id.

## POST /todos

Creates a todo.

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish todo app",
  "priority": "high",
  "dueDate": "2026-06-29"
}
```

## PUT /todos/:id

Updates a todo.

## PATCH /todos/:id/toggle

Toggles todo completed status.

## DELETE /todos/:id

Deletes a todo.
