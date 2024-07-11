import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        // res.send(req.cookies.auth_token)
        const token = req.headers.authorization.split(" ")[1]
        const { userId } = jwt.verify(token, process.env.JWT_Secret)
        req.userId = userId
        next()
    } catch (error) {
        res.status(400).send({ error: "Invalid Token", errorMsg: error.message })
    }
}