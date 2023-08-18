import Courses from "../../Model/courseModel.js"
import { Quizes } from "../../Model/quizModel.js"
import users from "../../Model/userSchema.js"

// fetch all courses 
export const getCourses = async(req,res)=>{
    try{
        const allCourses = await Courses.find({status:true,isDrafted:false})
        console.log(allCourses)
        if(allCourses.length === 0){
            res.json({message:"No Course",allCourses:[]})
        }

        
        res.json({message:"All Courses",allCourses})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getCourse = async(req,res)=>{
    try{
        const {courseId} = req.params
        const course = await Courses.find({_id:courseId})
        if(!course){
            res.json({message:"No Course",course:{}})
        }

        res.json({message:"course",course})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

// fetch all quizes
export const getQuizes = async(req,res)=>{
    try{
      const allQuizes = await Courses.find({status:true,isDrafted:false})
      if(!allQuizes){
          res.json({message:"No Quizes",allQuizes:[]})
      }
      res.json({message:"All Quizes",allQuizes})
    }catch(err){
      console.log("error",err)
      res.status(500).json({ error: 'An error occurred' });
    }
}

export const getQuiz = async(req,res)=>{
    try{
        const {quizId} = req.params
        const quiz = await Quizes.find({_id:quizId})
        if(!quiz){
            res.json({message:"No Quiz",quiz:{}})
        }

        res.json({message:"Quiz",quiz})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getEnrolledCourses = async(req,res)=>{
    
    try {
        const { userId } = req.params;
        const user = await users.findById(userId).populate('enrolledCourses.courseID');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
        const enrolledCourses = user.enrolledCourses;
        res.json({ enrolledCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getTestDetails = async(req,res)=>{
    
    try {
        const { userId } = req.params;
        const user = await users.findById(userId).populate('tests.quizID');

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const tests = user.tests;

        res.json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getTestRecords = async(req,res)=>{
  try {
    const { userId } = req.params;
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const tests = user.tests;

    res.json({ tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export const testSubmission = async(req,res)=>{
    
  try {
    const { userId } = req.params;
    const newTest = req.body; // New test data to add

    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.tests.push(newTest);
    await user.save();

    res.json({ message: 'New test added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export const saveCourseProgress = async(req,res)=>{
  try {
    const { userId, courseId } = req.params;
    const { newProgress } = req.body;

    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrolledCourse = user.enrolledCourses.find(course => course.courseID.toString() === courseId);

    if (!enrolledCourse) {
      return res.status(404).json({ error: 'Enrolled course not found' });
    }

    enrolledCourse.progress = newProgress;
    await user.save();

    res.json({ message: 'Course progress updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}