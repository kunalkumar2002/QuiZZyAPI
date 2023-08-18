import Jwt from "jsonwebtoken";
import users from "../Model/userSchema.js";
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async(req,res,next)=>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Authentication required' });
    }

    try{
        const decodedToken = Jwt.verify(token,process.env.USER_SECRETE_KEY)
        const user = await users.findOne({_id:decodedToken.userId})

        if(!user){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({ message: 'Internal Server Error' });
    }
}

export default authMiddleware