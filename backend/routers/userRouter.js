import express from "express"
import { deleteUser, getUser, updateUser, userLogin, userLogout, userSignup, } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/tokenVerify.js"

const userRouter = express.Router()
//demo
userRouter.get("/", (req, res) => {
    res.send("API is working")
})
//signup
userRouter.post("/signup", userSignup)

//login
userRouter.post("/login", userLogin)

//token verification
userRouter.get("/getuser", verifyToken, getUser)

//logout
userRouter.get("/logout", userLogout)

//updateUser
userRouter.put("/update", verifyToken, updateUser)

//deleteUser
userRouter.delete("/delete", verifyToken, deleteUser)


export default userRouter