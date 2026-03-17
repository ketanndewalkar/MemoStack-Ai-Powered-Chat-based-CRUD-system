import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const authMiddleware = async (req,res,next) => {
    const token = req.cookies.accessToken
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )
        const user = await User.findById(decoded.id);

        req.user = user

        next()

    }catch(err){

        return res.status(500).json({message:"Token expired"})
    }
}

export default authMiddleware
