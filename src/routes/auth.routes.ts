import express from "express"
const authRouter = express.Router()
import { loginController, registerController } from "../controller/auth/auth.controller"

authRouter.post("/login", loginController)
authRouter.post("/register", registerController)

export default authRouter

