import { Request, Response } from "express";
import categoryModel from "../../models/category.model";
import { UpdateWriteOpResult } from "mongoose"

export async function getCategory(req: Request, res: Response) {
    try {
        const user = req.user
        const categories = await categoryModel.find({ user: user._id })
        res.status(200).json(categories)
    } catch (error: any) {
        res.status(403).json({
            status: "Failed",
            message: error.message
        })
    }
}

export async function getCategoryById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const category = await categoryModel.findById(id)
        if (!category) {
            res.status(404).json({
                status: "Failed",
                message: `no category with id:${id} found`
            })
        } else {
            res.status(200).json({
                status: "successfull",
                category
            })
        }
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
}

export async function createCategory(req: Request, res: Response) {
    try {
        const { title, isFav } = req.body
        const newCategory = await categoryModel.create({ name: title, isFav: isFav, user: req.user._id })
        newCategory.save()
        res.status(200).json({
            status: "Successfull",
            message: `${title} category created successfully`
        })
    } catch (error: any) {
        res.status(403).json({
            status: "Failed",
            message: error.message
        })

    }
}

export async function getCategoryId(req: Request, res: Response) {
    try {
        const { Name } = req.body
        const category = await categoryModel.findOne({ name: Name })
        res.status(200).json({
            status: "Successfull",
            Id: category
        })
    } catch (error: any) {
        res.status(403).json({
            status: "Failed",
            Id: error.message
        })
    }
}

export async function updateCategory(req: Request, res: Response) {
    try {
        const { Id, name, isFav } = req.body
        const result: UpdateWriteOpResult = await categoryModel.updateOne({ _id: Id }, { name: name, isFav: isFav }, { new: true })
        if (!result) {
            // If task is null, the document was not found
            return res.status(404).json({
                status: "Failed",
                message: "Task not found with the provided Id.",
            });
        }
        if (result.modifiedCount > 0) {
            // The update was successful, now find the updated document
            const updatedCategory = await categoryModel.findOne({ _id: Id });

            // Handle the case when the document is not found after the update
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Task not found after update.' });
            }

            // If the document is found, send it in the response
            return res.status(200).json(updatedCategory);
        } else {
            // Handle the case when no document was updated
            return res.status(404).json({ error: 'Task not found or no updates were made.' });
        }
    } catch (e: any) {
        res.status(200).json({
            status: "Successfull",
            category: "null"
        })
    }
}

export async function deleteCategory(req: Request, res: Response) {
    try {
        const { Id, name } = req.body
        if (Id) {
            const category = await categoryModel.findByIdAndDelete(Id)
            res.status(200).json({
                status: "Successfull",
                message: `todo with id ${Id} removed`
            })
        } else {
            const category = await categoryModel.findOneAndDelete({ name: name })
            res.status(200).json({
                status: "Successfull",
                message: `todo with id ${Id} removed`
            })
        }
    } catch (e: any) {
        res.status(200).json({
            status: "Failed",
            message: e.message
        })
    }
}