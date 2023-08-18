import users from '../../Model/userSchema.js'
import creators from '../../Model/creatorModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Jwt  from 'jsonwebtoken'

dotenv.config()

export const userSignUp = async(req,res)=>{
    try{
        const {name,email,password,role}=req.body
        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser =  new users({name,email,password:hashedPassword,role})
        await newUser.save();

        const token = Jwt.sign({ userId: newUser._id }, process.env.USER_SECRETE_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully',token,user:newUser });
    }catch(err){
        res.status(500).json({ error: 'Error registering user' });    
    }
}

export const creatorSignup = async(req,res)=>{
    try{
        const {name,email,password,role,contactEmail}= req.body
        const existingUser = await creators.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const creator = new creators({name,email,password:hashedPassword,role,contactEmail})
        await creator.save()

        const token = Jwt.sign({userId:creator._id},process.env.CREATOR_SECRETE_KEY,{expiresIn:'1h'})
        res.status(201).json({message:"Creator Created Successfuly wait for activation",token,creator})
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
}

export const userLogin = async(req,res)=>{
    try{
    const {email,password} = req.body
    const user = await users.findOne({email});
        if(!user){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = Jwt.sign({ userId: user._id }, process.env.USER_SECRETE_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "User Authenticated successfully",token,user});
    
    }catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const creatorLogin = async(req,res)=>{
    try{
        const {email,password,}= req.body
        const creator = await creators.findOne({email})
        if(!creator){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(password,creator.password)
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = Jwt.sign({userId: creator._id},process.env.CREATOR_SECRETE_KEY,{expiresIn:'1h'})
        res.status(200).json({message:"Creator Authenticated Successfully",token,creator})

    }catch(err){
        console.log("errr ",err)
        res.status(500).json({error:"Internal server error"})
    }
}

export const authSuperAdmin = async(req,res)=>{
    try{
        const {email,password,role} = req.body
        const superAdmin = await creators.findOne({email})
        if(!superAdmin){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        if(superAdmin.role!==role){
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(password,superAdmin.password)
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Authentication failed' });
        }        

        res.status(200).json({message:"Super Admin Authenticated Successfully"})

    }catch(err){
        console.log("error ",err)
    }
}