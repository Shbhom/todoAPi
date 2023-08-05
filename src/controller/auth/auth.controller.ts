import { Request, Response } from "express";
import userModel from "../../models/user.model";
import categoryModel from "../../models/category.model";
import { signJwt } from "../../utils/jwt.utils";

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.status(401).json({
                status: "Failed",
                message: `no user with ${email} found`
            })
        } else {
            const validate = await user!.validateUser(password)
            if (!validate) {
                res.status(403).json({
                    status: "Failed",
                    message: `incorrect password`
                })
            } else {
                const accessToken = signJwt({ user: user }, "15m")
                res.cookie("accessToken", accessToken, { secure: true, httpOnly: true, maxAge: 15 * 60 * 1000 })
                const refreshToken = signJwt({ userId: user._id }, "2d")
                res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
                res.status(200).json({
                    status: "successfull",
                    message: `welcome ${user!.name}`
                })
            }
        }
    } catch (error: any) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

export async function registerController(req: Request, res: Response) {
    try {
        const { email, name, password } = req.body
        const user = await userModel.create({ email: email, name: name, password: password })
        user.save()
        const inbox = await categoryModel.create({ name: "inbox", isFav: true, user: user._id })
        inbox.save()
        const accessToken = signJwt({ user: user }, "15m")
        res.cookie("accessToken", accessToken, { secure: true, httpOnly: true, maxAge: 15 * 60 * 1000 })
        const refreshToken = signJwt({ userId: user._id }, "2d")
        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        res.status(200).json({
            status: "successfull",
            message: `welcome ${user.name}`
        })
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
}