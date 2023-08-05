import express from "express"
import cookieparser from "cookie-parser"
import "dotenv/config"
import ConnectDB from "./utils/db.utils"
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", authRouter)
app.use("/api", userRouter)

app.listen(port, async () => {
    await ConnectDB()
    console.log(`app is listening to port ${port}`)
})