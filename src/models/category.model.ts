import mongoose, { Schema, model, Document, mongo, StringExpressionOperatorReturningBoolean, ObjectId } from "mongoose"

export interface categoryDocument extends Document {
    name: string;
    isFav: boolean;
    user: ObjectId;
}
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isFav: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})
const categoryModel = model<categoryDocument>("category", categorySchema)
export default categoryModel