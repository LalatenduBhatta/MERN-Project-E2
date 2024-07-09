import mongoose, { Schema } from "mongoose"

const otpSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, require: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expireAt: { type: Date }
})


export const otpModel = mongoose.model("OTPs", otpSchema)