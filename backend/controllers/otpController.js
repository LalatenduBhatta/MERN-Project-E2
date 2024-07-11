import crypto from "crypto"
import userModel from "../model/userModel.js"
import { otpModel } from "../model/otpModel.js"
import transporter from "../utils/nodemailer.js"

export const generateOtp = async (req, res) => {
    try {
        const { userId } = req
        const user = await userModel.findById(userId)
        if (user) {
            const otp = crypto.randomInt(100000, 999999).toString()
            const createdAt = new Date()
            const expireAt = new Date(createdAt.getTime() + 5 * 60 * 1000)
            const mailOptions = {
                from: "lalatendubhatta@gmail.com",
                to: user.email,
                subject: "THE CHAT APP OTP",
                text: `Hey user this the otp of chat app - ${otp} Do not share your otp with anyone. 
                OTP valid for 5mins`
            }
            let isCreated = await otpModel.findOne({ userId })
            if (isCreated) {
                let now = new Date()
                let prevCreatedAt = isCreated.createdAt
                if (now - prevCreatedAt < 30000) {
                    return res.status(400).send({ error: "Wait for 30sec before creating new otp" })
                } else {
                    await transporter.sendMail(mailOptions)
                    await otpModel.updateOne({ userId }, {
                        $set: {
                            otp,
                            createdAt,
                            expireAt
                        }
                    })
                    return res.status(200).send({ message: "Otp sent ot the user Email" })
                }
            }
            else {
                const otpData = new otpModel({ userId: user._id, otp, createdAt, expireAt })
                await Promise.all([transporter.sendMail(mailOptions), otpData.save()])
                return res.status(200).send({ message: "Otp sent ot the user Email" })
            }
        } else {
            return res.status(400).send({ error: "User Not Found" })
        }
    } catch (error) {
        res.status(500).send({ error: "Something went wrong", errorMessage: error.message })
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const userId = req.userId
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).send({ error: "User Not Found" })
        } else {
            let userOtpId = user._id
            const otpData = await otpModel.findOne({ userId: userOtpId })
            const now = new Date
            if (now > otpData.expireAt) {
                return res.status(400).send({ error: "OTP is expired ,Generate again" })
            } else {
                let { userOtp } = req.body
                if (userOtp === otpData.otp) {
                    return res.status(200).send({ message: "OTP verified successfully" })
                } else {
                    return res.status(400).send({ error: "OTP is not matching try again" })
                }
            }
        }
    } catch (err) {
        res.status(500).send({ error: "Something went wrong", errorMessage: err.message })
    }
}