import express from "express"
import { getMsg, sendMsg } from "../controllers/messageController.js"
import { verifyToken } from "../middlewares/tokenVerify.js"

const msgRouter = express.Router()
//demo
msgRouter.get("/", (req, res) => {
    res.send("Msg router is working")
})

//send message API
msgRouter.post("/send/:receiverId", verifyToken, sendMsg)

//get messages API
msgRouter.get("/get", getMsg)



export default msgRouter