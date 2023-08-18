import bodyParser from 'body-parser';
import  Express  from 'express';
import cors from 'cors'
import { mailRoutes } from './Router/mailRoutes.js';
import { QuizCourserouter } from './Router/creatorRouter.js';
import { authRoutes } from './Router/authRoutes.js';
import { userRoutes } from './Router/userRoutes.js';
import { adminRoutes } from './Router/adminRoutes.js';

import mongoose from 'mongoose';
const app = Express();
const PORT = 3002; // You can use any available port number
app.use(cors())
app.use(Express.json())


// mongodb connect
mongoose.connect('mongodb://127.0.0.1/quizzyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());
app.use("/mail",mailRoutes)
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)

app.use("/creator",QuizCourserouter)

// API endpoint to handle sending emails


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
