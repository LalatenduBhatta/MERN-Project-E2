import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    fName: { type: String, require: true },
    LName: { type: String },
    mobile: { type: String },
    email: { type: String, require: true, unique: true },
    gender: { type: String },
    age: { type: Number },
    address: {
        type: {
            location: String,
            landmark: String,
            pin: Number,
            state: String,
            country: String
        }
    },
    createdIN: { type: Date, default: Date.now },
    password: { type: String, require: true }
})


const userModel = mongoose.model("users", userSchema)

export default userModel