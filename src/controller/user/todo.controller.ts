import { Request, Response } from "express";
import todoModel from "../../models/todo.model";
import { isObjectIdOrHexString, UpdateWriteOpResult } from "mongoose";
import categoryModel from "../../models/category.model";

export async function getTodos(req: Request, res: Response) {
    const user = req.user
    const todos = await todoModel.find({ user: user._id })
    res.status(200).json({
        todos: todos
    })
}

export async function createTodo(req: Request, res: Response) {
    try {
        const { title, description, dueDate, category, priority } = req.body
        const user = req.user
        let todo, due
        if (dueDate) {
            due = new Date(dueDate)
        }
        if (category.isObjectIdOrHexString) {
            todo = await todoModel.create({ title: title, description: description, duedate: due, category: category, priority: priority, user: user._id })
            todo.save()
        } else {
            const cat = await categoryModel.findOne({ name: category })
            const categoryId = cat?._id
            todo = await todoModel.create({ title: title, description: description, duedate: due, category: categoryId, priority: priority, user: user._id })
            todo.save()
        }
        res.status(200).json({
            status: "successfull",
            message: `${todo.title} created successfully`,
            todo: todo
        })
    } catch (error: any) {
        res.status(403).json({
            status: "successfull",
            message: error.message
        })
    }
}

export async function getTaskId(req: Request, res: Response) {
    try {
        const { title } = req.body
        const user = req.user
        const task = await todoModel.findOne({ title: title, user: user._id })
        if (!task) {
            res.status(404).json({
                status: "Failed",
                message: "todo not found"
            })
        } else {
            res.status(200).json({
                status: "successfull",
                taskId: task?._id
            })
        }
    } catch (error: any) {
        res.status(403).json({
            status: "successfull",
            taskId: null
        })
    }
}

export async function getTodoById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const task = await todoModel.findById(id)
        if (!task) {
            res.status(404).json({
                status: "Failed",
                message: `no todo with id:${id} found`
            })
        } else {
            res.status(200).json({
                status: "successfull",
                task
            })
        }
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const { Id, title, description, dueDate, completed, categoryId, priority } = req.body
        let due
        if (dueDate) {
            due = new Date(dueDate)
        }
        const result: UpdateWriteOpResult = await todoModel.updateOne({ _id: Id }, { title: title, description: description, dueDate: dueDate, completed: completed, category: categoryId, priority: priority }, { new: true })
        if (!result) {
            // If task is null, the document was not found
            return res.status(404).json({
                status: "Failed",
                message: "Task not found with the provided Id.",
            });
        }
        if (result.modifiedCount > 0) {
            // The update was successful, now find the updated document
            const updatedTask = await todoModel.findOne({ _id: Id });

            // Handle the case when the document is not found after the update
            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found after update.' });
            }

            // If the document is found, send it in the response
            return res.status(200).json(updatedTask);
        } else {
            // Handle the case when no document was updated
            return res.status(404).json({ error: 'Task not found or no updates were made.' });
        }
    } catch (error: any) {
        res.status(403).json({
            status: "Failed",
            message: error.message
        })
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        const { Id } = req.body
        const task = await todoModel.findByIdAndDelete(Id)
        res.status(200).json({
            status: "successfull",
            message: `todo with id:${Id} removed`
        })
    } catch (e: any) {
        res.status(403).json({
            status: "successfull",
            message: e.message
        })
    }
}

export async function getTodoByCategory(req: Request, res: Response) {
    try {
        const categoryId = req.params.categoryId
        const tasks = await todoModel.find({ category: categoryId })
        if (!tasks) {
            return res.status(404).json({
                status: "Failed",
                message: `no tasks of category ${categoryId} found`
            })
        } else {
            return res.status(200).json({
                status: "successfull",
                tasks
            })
        }
    } catch (e: any) {

    }
}