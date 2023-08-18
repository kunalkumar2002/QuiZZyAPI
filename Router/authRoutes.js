import Express from "express";
import {
    userSignUp,
    userLogin,
    creatorSignup,
    creatorLogin,
    authSuperAdmin

} from '../controller/Auth/auth.js'
export const authRoutes = Express.Router()

authRoutes.post("/signup-user",userSignUp)
authRoutes.post("/login-user",userLogin)

authRoutes.post("/signup-creator",creatorSignup)
authRoutes.post("/login-creator",creatorLogin)

authRoutes.post("/auth-superAdmin",authSuperAdmin)
