import express from "express"
import { userSignup } from "../controllers/userController.js"

const userRouter = express.Router()
//demo
userRouter.get("/", (req, res) => {
    res.send("API is working")
})
//signup
userRouter.post("/signup", userSignup)




export default userRouter