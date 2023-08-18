import express from 'express'
import { sendMailToAdmin, sendMailToUser } from '../controller/MailApi/mailApi.js'
export const mailRoutes = express.Router()

mailRoutes.post("/send-emailtoadmin",sendMailToAdmin)
mailRoutes.post("/send-emailtoUser",sendMailToUser)