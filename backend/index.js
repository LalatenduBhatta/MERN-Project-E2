import express from "express"
import cors from "cors"
import { config } from "dotenv"
import dbConnect from "./db/dbConnect.js"
import userRouter from "./routers/userRouter.js"

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
config()

//routers
app.use("/user", userRouter)

//PORT and hostname
const PORT = process.env.PORT
const hostname = process.env.hostname

//listen method
app.listen(PORT, hostname, () => {
    console.log(`server is running at http://${hostname}:${PORT}`);
    dbConnect()
})


