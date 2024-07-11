import express from "express"
import { generateOtp, verifyOtp } from "../controllers/otpController.js"
import { verifyToken } from "../middlewares/tokenVerify.js"

export const otpRouter = express.Router()

//route api

otpRouter.get("/", (req, res) => {
    res.send("Otp routing is working")
})

otpRouter.get("/generate", verifyToken, generateOtp)

otpRouter.post("/verify", verifyToken, verifyOtp)

