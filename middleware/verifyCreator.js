import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import creators from "../Model/creatorModel.js";
dotenv.config()

const authCreatorMiddleware = async(req,res,next)=>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Authentication required' });
    }

    try{
        const decodedToken = Jwt.verify(token,process.env.CREATOR_SECRETE_KEY)
        const creator = await creators.findOne({_id:decodedToken.userId})

        if(!creator){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.creator = creator;
        next();
    }catch(err){
        res.status(401).json({ message: 'Internal Server Error Authentication failed',error:err });
    }
}

export default authCreatorMiddleware