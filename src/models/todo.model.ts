import mongoose, { Schema, model, Document, ObjectId } from "mongoose"
import categoryModel from "./category.model";

export interface todoDocument extends Document {
    title: string;
    description: string;
    duedate: Date;
    priority: number;
    category: ObjectId;
    user: ObjectId;
    completed: boolean
}
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    duedate: {
        type: Date,
        default: () => {
            const today = new Date()
            today.setHours(23, 59, 59, 999)//set the dueDate to be the end of the day
            return today
        }
    },
    priority: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 4,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

todoSchema.pre("save", async function (next) {
    const todo = this as unknown as todoDocument
    if (todo.category === null || todo.category === undefined) {
        return next()
    } else {
        const category = await categoryModel.findOne({ user: todo.user, isFav: true })
        todo.category = category?._id
        return next()
    }
})

const todoModel = model<todoDocument>("Todo", todoSchema)
export default todoModel