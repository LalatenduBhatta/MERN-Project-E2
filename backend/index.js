import express from "express"
import cors from "cors"
import { config } from "dotenv"
import dbConnect from "./db/dbConnect.js"
import userRouter from "./routers/userRouter.js"
import { otpRouter } from "./routers/otpRouter.js"
import msgRouter from "./routers/messageRouter.js"
import cookieParser from "cookie-parser"

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
config()

//routers
app.use("/user", userRouter)
app.use("/otp", otpRouter)
app.use("/msg", msgRouter)

//PORT and hostname
const PORT = process.env.PORT
const hostname = process.env.hostname

//listen method
app.listen(PORT, hostname, () => {
    console.log(`server is running at http://${hostname}:${PORT}`);
    dbConnect()
})


