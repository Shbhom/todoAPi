import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface userDocument extends Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    validateUser(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this as unknown as userDocument
    if (!user.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return next()
})

userSchema.methods.validateUser = async function (candidatePassword: string): Promise<boolean> {
    try {
        const user = this as unknown as userDocument
        return await bcrypt.compare(candidatePassword, user.password)
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}
const userModel = model<userDocument>("User", userSchema)
export default userModel