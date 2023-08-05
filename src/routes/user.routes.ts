import express, { Request, Response } from "express"
import validateUser from "../middleware/validateUser.middleware"
import { createTodo, deleteTask, getTaskId, getTodoByCategory, getTodoById, getTodos, updateTask } from "../controller/user/todo.controller"
import { createCategory, deleteCategory, getCategory, getCategoryById, getCategoryId, updateCategory } from "../controller/user/category.controller"
const userRouter = express.Router()

userRouter.get("/todos", validateUser, getTodos)
userRouter.get("/todos/:id", validateUser, getTodoById)
userRouter.get("/todosId", validateUser, getTaskId)
userRouter.post("/todos", validateUser, createTodo)
userRouter.delete("/todos", validateUser, deleteTask)
userRouter.patch("/todos", validateUser, updateTask)
userRouter.get("/categories", validateUser, getCategory)
userRouter.get("/categories/:id", validateUser, getCategoryById)
userRouter.post("/categories", validateUser, createCategory)
userRouter.delete("/categories", validateUser, deleteCategory)
userRouter.get("/categoryId", validateUser, getCategoryId)
userRouter.patch("/categories", validateUser, updateCategory)
userRouter.get("/categories/:categoryId/todos", validateUser, getTodoByCategory)


export default userRouter