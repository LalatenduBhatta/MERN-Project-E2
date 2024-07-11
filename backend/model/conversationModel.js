import mongoose, { Schema } from "mongoose"

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "users"
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            default: [],
            ref: "messages"
        }
    ]
}, { timestamps: true })


export const conversationModel = mongoose.model("conversation", conversationSchema)