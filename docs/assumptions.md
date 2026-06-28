# Assumptions

1. The todo application does not need login or signup because authentication was not mentioned in the assignment.
2. File storage is used instead of a database because the assignment accepts either file or database storage.
3. The frontend is built as a multi-page React app using two HTML pages:
   - `index.html` for todo list
   - `todo.html` for single todo details
4. The single todo page receives todo id using query parameter, for example:

```bash
/todo.html?id=sample-1
```

5. Basic validation is added for todo title.
