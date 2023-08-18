import  Courses from "../../Model/courseModel.js"
import creators from "../../Model/creatorModel.js"
import { Quizes } from "../../Model/quizModel.js"


export const addNewCourse = async(req,res)=>{
   try { 
        const courseDetails = req.body

        const newCourse = {
            courseName:courseDetails.courseName,
            creatorId:courseDetails.creatorId,
            status:false,
            isDrafted:courseDetails.isDrafted,
            queryMail:courseDetails.queryMail,
            thumbnail:courseDetails.thumbnail,
            price:courseDetails.price,
            courseQuestions:courseDetails.courseQuestions
        }
        const createdCourse =  new Courses(newCourse)
        await createdCourse.save()

        const courseId = createdCourse._id
        const updatedCreator = await creators.findByIdAndUpdate(
            courseDetails.creatorId,
            { $push: { createdCourses: {_id:courseId} } },
            { new: true }
          );
        await updatedCreator.save()
        res.status(201).json({ message: 'Course Uploaded Successfully waiting for approval'});
    }
    catch(err){
      console.log("error",err)
      res.status(400).json({ message: 'Error creating user', error: err.message });
    }
}


export const updateCourse = async(req,res)=>{
    try{
        const { courseId } = req.params;
        const updatedFields = req.body; // An object containing fields to update
    
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        if(!course.editMode){
            return res.status(404).json({ Message: 'Please take Admin Permission',error:"No Edit Permission" });
        }
    
        for (const field in updatedFields) {
          if (field !== '_id') {
            if (course[field] !== undefined) {
                course[field] = updatedFields[field];
            }
          }
        }
        await course.save();
        res.json({message:"Course Updated Successfully"})
    }catch(err){
        console.log("error ",err)
    }
}


export const deleteCourse = async(req,res)=>{
    try{
        const {courseId} = req.body
        const {creatorId} = await Courses.findById(courseId)

        const updatedCreator = await creators.findByIdAndUpdate(
            creatorId,
            { $pull: { createdCourses: {_id:courseId} } },
            { new: true }
          );
        if (!updatedCreator) {
          return res.status(404).json({ message: 'User not found' });
        }
        const deletedCourse = await Courses.deleteOne({ _id: courseId });

        if (deletedCourse.deletedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        // pending delete this course if from userSchema as well
    
        res.status(200).json({ message: 'Course deleted successfully' });
    }catch(err){
      console.log("error",err)
      res.status(500).json({ error: 'Error deleting Course' });
    }
}


export const addNewQuiz = async(req,res)=>{
    try { 
        const quizDetails = req.body
        const creator = await creators.findById(quizDetails.creatorId)
        const newQuiz = {
            quizname:quizDetails.quizname,
            creatorId:quizDetails.creatorId,
            status:false,
            isDrafted:updatedFields.isDrafted,
            thumbnail:quizDetails.thumbnail,
            price:quizDetails.price,
            quizQuestions:quizDetails.quizQuestions
        }
        const createdQuiz =  new Quizes(newQuiz)
        await createdQuiz.save()

        const updatedCreator = await creators.findByIdAndUpdate(
            quizDetails.creatorId,
            { $push: { createdQuizzes: {_id:createdQuiz._id} } },
            { new: true }
          );
        await updatedCreator.save()
        res.status(201).json({ message: 'Quiz Uploaded Successfully waiting for approval'});
     }
     catch(err){
        console.log("error",err)
        res.status(400).json({ message: 'Error creating user', error: err.message });
     }
 }


 export const deleteQuiz = async(req,res)=>{
    try{
        const {quizId} = req.body
        const {creatorId} = await Courses.findById(quizId)

        const updatedCreator = await creators.findByIdAndUpdate(
            creatorId,
            { $pull: { createdQuizzes: {_id:quizId} } },
            { new: true }
          );
        if (!updatedCreator) {
          return res.status(404).json({ message: 'User not found' });
        }

        const deletedQuiz = await Quizes.deleteOne({ _id: quizId });

        if (deletedQuiz.deletedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        // pending delete this course if from userSchema as well
    
        res.status(200).json({ message: 'Quiz deleted successfully' });
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'Error deleting Course' });
    }
}


export const updateQuiz = async(req,res)=>{
    try{
        const { quizId } = req.params;
        const updatedFields = req.body; // An object containing fields to update
    
        const quiz = await Quizes.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
    
        for (const field in updatedFields) {
          if (field !== '_id') {
            if (quiz[field] !== undefined) {
                quiz[field] = updatedFields[field];
            }
          }
        }
        await quiz.save();
        res.json({message:"Course Updated Successfully"})
    }catch(err){
        console.log("error ",err)
    }
}


export const getCreatedCourses = async(req,res)=>{
   const {creatorId} = req.body;

  try {
    const courses = await Courses.find({ creatorId,isDrafted:false });

    if (!courses) {
      return res.status(404).json({ error: 'No course found' });
    }

    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


export const getCreatedQuizes = async(req,res)=>{
   const {creatorId} = req.body;

  try {
    const quizzes = await Quizes.find({ creatorId,isDrafted:false });

    if (!quizzes) {
      return res.status(404).json({ error: 'No quizzes found' });
    }

    res.json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


export const getCreatedCourse = async(req,res)=>{
  const {creatorId,courseId} = req.body;

  try {
    const course = await Courses.findOne({ _id: courseId, creatorId });

    if (!course) {
      return res.status(404).json({ error: 'No course found' });
    }

    res.json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


export const getCreatedQuiz = async(req,res)=>{
  const {creatorId,quizId} = req.body;

  try {
    const quiz = await Quizes.findOne({ _id: quizId, creatorId });

    if (!quiz) {
      return res.status(404).json({ error: 'No quiz found' });
    }

    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


export const getDraftedCourse = async(req,res)=>{
    try{
        const {courseId} = req.params

        const draftedCourse = await Courses.findOne({_id:courseId,isDrafted:true})
       
        if(!draftedCourse){
            return res.status(404).json({ error: 'Drafted Course Not Found' });
        }

        res.json({ message: 'Success',draftedCourse });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getDraftedQuiz = async(req,res)=>{
    try{
        const {quizId} = req.params

        const draftedQuiz = await Quizes.findOne({_id:quizId,isDrafted:true})
       
        if(!draftedQuiz){
            return res.status(404).json({ error: 'Drafted Quiz Not Found' });
        }

        res.json({ message: 'Success',draftedQuiz });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


export const draftCourse = async(req,res)=>{
    try {
        const { courseId,action } = req.params;
        const updatedFields = req.body; // An object containing fields to update
        if(action==="edit"){
            const course = await Courses.findById(courseId);
            if (!course) {
              return res.status(404).json({ error: 'Course not found' });
            }
        
            for (const field in updatedFields) {
              if (field !== '_id') {
                if (course[field] !== undefined) {
                  course[field] = updatedFields[field];
                }
              }
            }
            await course.save();
        }else{
            const newCourse = {
                courseName:updatedFields.courseName,
                creatorId:updatedFields.creatorId,
                status:false,
                isDrafted:updatedFields.isDrafted,
                queryMail:updatedFields.queryMail,
                thumbnail:updatedFields.thumbnail,
                price:updatedFields.price,
                courseQuestions:updatedFields.courseQuestions
            }
            const createdCourse =  new Courses(newCourse)
            await createdCourse.save()
    
            const courseId = createdCourse._id
            const updatedCreator = await creators.findByIdAndUpdate(
                updatedFields.creatorId,
                { $push: { createdCourses: {_id:courseId} } },
                { new: true }
              );
            await updatedCreator.save()
        }
        res.json({ message: 'All fields updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}


export const draftQuiz = async(req,res)=>{
    try {
        const { quizId,action } = req.params;
        const updatedFields = req.body; // An object containing fields to update
        if(action==="edit"){
            const quiz = await Quizes.findById(quizId);
            if (!quiz) {
              return res.status(404).json({ error: 'Quiz not found' });
            }
        
            for (const field in updatedFields) {
              if (field !== '_id') {
                if (quiz[field] !== undefined) {
                    quiz[field] = updatedFields[field];
                }
              }
            }
            await quiz.save();
        }else{
            const newQuiz = {
                quizName:updatedFields.courseName,
                creatorId:updatedFields.creatorId,
                status:false,
                isDrafted:updatedFields.isDrafted,
                queryMail:updatedFields.queryMail,
                thumbnail:updatedFields.thumbnail,
                price:updatedFields.price,
                quizQuestions:updatedFields.quizQuestions
            }
            const createdQuiz =  new Quizes(newQuiz)
            await createdQuiz.save()
    
            const newQuizId = createdQuiz._id
            const updatedCreator = await creators.findByIdAndUpdate(
                updatedFields.creatorId,
                { $push: { createdQuizzes: {_id:newQuizId} } },
                { new: true }
              );
            await updatedCreator.save()
        }
        res.json({ message: 'All fields updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}