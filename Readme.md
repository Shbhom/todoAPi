# TODOIST API Clone

Below are the routes for the TODOIST API clone. The API provides various endpoints to manage tasks and categories for registered users. The routes are categorized based on their functionality.

## Authentication

### POST `/login`
- Description: Authenticate the user with their credentials (username and password) to obtain an access token.
- Controller: `loginController`

### POST `/register`
- Description: Register a new user with the provided details (username, email, password).
- Controller: `registerController`

## Tasks

### GET `/todos`
- Description: Retrieve all tasks associated with the authenticated user.
- Middleware: `validateUser`
- Controller: `getTodos`

### GET `/todos/:id`
- Description: Retrieve a specific task by its ID for the authenticated user.
- Middleware: `validateUser`
- Controller: `getTodoById`

### GET `/todosId`
- Description: Retrieve all task IDs associated with the authenticated user.
- Middleware: `validateUser`
- Controller: `getTaskId`

### POST `/todos`
- Description: Create a new task for the authenticated user.
- Middleware: `validateUser`
- Controller: `createTodo`

### DELETE `/todos`
- Description: Delete a task for the authenticated user.
- Middleware: `validateUser`
- Controller: `deleteTask`

### PATCH `/todos`
- Description: Update a task for the authenticated user.
- Middleware: `validateUser`
- Controller: `updateTask`

### GET `/categories`
- Description: Retrieve all categories associated with the authenticated user.
- Middleware: `validateUser`
- Controller: `getCategory`

### GET `/categories/:id`
- Description: Retrieve a specific category by its ID for the authenticated user.
- Middleware: `validateUser`
- Controller: `getCategoryById`

### POST `/categories`
- Description: Create a new category for the authenticated user.
- Middleware: `validateUser`
- Controller: `createCategory`

### DELETE `/categories`
- Description: Delete a category for the authenticated user.
- Middleware: `validateUser`
- Controller: `deleteCategory`

### GET `/categoryId`
- Description: Retrieve all category IDs associated with the authenticated user.
- Middleware: `validateUser`
- Controller: `getCategoryId`

### PATCH `/categories`
- Description: Update a category for the authenticated user.
- Middleware: `validateUser`
- Controller: `updateCategory`

### GET `/categories/:categoryId/todos`
- Description: Retrieve all tasks associated with a specific category for the authenticated user.
- Middleware: `validateUser`
- Controller: `getTodoByCategory`

Please note that some of the routes require authentication, and the `validateUser` middleware is responsible for ensuring that only authenticated users can access these routes.