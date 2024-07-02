import userModel from "../model/userModel.js"
import bcrypt from "bcrypt"
import { config } from "dotenv";
config()

export const userSignup = async (req, res) => {
    try {
        const { username, fName, password, email } = req.body
        if (!username || !password || !fName || !email) {
            return res.status(400).send({ error: "Provide all required field" })
        }
        else {
            const isUser = await userModel.findOne({ email })
            if (isUser) {
                return res.status(400).send({ error: "User already Registerd" })
            }
            else {
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = new userModel({ ...req.body, password: hashedPassword })
                let response = await user.save()
                res.status(201).send(response)
            }
        }
    } catch (err) {
        return res.status(500).send({ error: "Something Went Wrong ", errorMsg: err.message })
    }
}