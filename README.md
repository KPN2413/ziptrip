# Ziptrrip Todo Application

This project is submitted for the Ziptrrip Developer Assignment.

It contains a multi-page React frontend and a Node.js + Express backend with CRUD APIs for todos. Data is stored in a JSON file.

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express.js
- Storage: JSON file (`backend/data/todos.json`)

## Features

- Add a todo with title, description, priority and due date
- View all todos
- Search todos
- Filter todos by all, active and completed
- Update todo details
- Mark todo as completed or active
- Delete todo
- Open a separate todo details page using query parameter `id`
- Backend CRUD APIs with JSON file persistence

## Pages

1. Todo List Page
   - URL: `http://localhost:5173/`
   - Shows todos list and add/edit form.

2. Todo Details Page
   - URL example: `http://localhost:5173/todo.html?id=sample-1`
   - Reads `id` from query parameter and displays one todo.

## How to Run

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Start backend

```bash
npm run dev:backend
```

Backend runs on:

```bash
http://localhost:4000
```

### 3. Start frontend

Open a second terminal and run:

```bash
npm run dev:frontend
```

Frontend runs on:

```bash
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| GET | `/api/todos` | Get todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completed status |
| DELETE | `/api/todos/:id` | Delete todo |

## Assumptions

- A multi-page React application is implemented using separate HTML pages: `index.html` and `todo.html`.
- Data is stored in a JSON file because the assignment allows file or database storage.
- No authentication is added because it was not asked in the assignment.
- The app is intentionally simple and focused on assignment requirements.

## How to Push to GitHub

```bash
git init
git add .
git commit -m "Complete Ziptrrip todo assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

After pushing, paste the GitHub repository link in the completed assignment document.
