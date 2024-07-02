import express from "express"

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send("API is working")
})





export default userRouter