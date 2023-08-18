import Courses from "../../Model/courseModel.js"
import creators from "../../Model/creatorModel.js"
import { Quizes } from "../../Model/quizModel.js"
import users from "../../Model/userSchema.js"

export const fetchPendingCourses= async(req,res)=>{
    try{
        const pendingCourses = await Courses.find({status:false,isDrafted:false})
        if(!pendingCourses){
            res.json({message:"No Pending Course",pendingCourses:[]})
        }

        res.json({message:"All Pending Courses",pendingCourses})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const fetchPendingQuizes= async(req,res)=>{
    try{
        const pendingQuizes = await Courses.find({status:false,isDrafted:false})
        if(!pendingQuizes){
            res.json({message:"No Pending Quizes",pendingQuizes:[]})
        }

        res.json({message:"All Pending Quizes",pendingQuizes})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const fetchAllCourses= async(req,res)=>{
    try{
        const allCourses = await Courses.find({status:true,isDrafted:false})
        if(!allCourses){
            res.json({message:"No Course",allCourses:[]})
        }

        res.json({message:"All Courses",allCourses})
    }catch(err){
        console.log("error",err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const fetchAllQuizes= async(req,res)=>{
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


export const UpdateCourseStatus= async(req,res)=>{
    const { courseId } = req.params;
    const { newStatus } = req.body;
  
    try {
      const course = await Courses.findByIdAndUpdate(courseId, { status: newStatus }, { new: true });
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json({ message: 'Status updated successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

export const UpdateQuizStatus= async(req,res)=>{
    const { quizId } = req.params;
    const { newStatus } = req.body;
  
    try {
      const quiz = await Quizes.findByIdAndUpdate(quizId, { status: newStatus }, { new: true });
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json({ message: 'Status updated successfully', quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

export const handleCourseEditMode= async(req,res)=>{
    const { courseId } = req.params;
    const { mode } = req.body;
  
    try {
      const course = await Courses.findByIdAndUpdate(courseId, { editMode: mode }, { new: true });
  
      if (!course) {
        return res.status(404).json({ error: 'course not found' });
      }
  
      res.json({ message: 'Mode updated successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

export const handleQuizEditMode= async(req,res)=>{
    const { quizId } = req.params;
    const { mode } = req.body;
  
    try {
      const quiz = await Quizes.findByIdAndUpdate(quizId, { editMode: mode }, { new: true });
  
      if (!quiz) {
        return res.status(404).json({ error: 'course not found' });
      }
  
      res.json({ message: 'Mode updated successfully', quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        const allUsers = await users.find()
        if(!allUsers){
            res.json({message:"No user"})
        }

        res.json({message:"All Users",allUsers})

    }catch(err){
      console.log("error",err)
      res.status(500).json({error:"An error occurred"})
    }
}

export const getAllCreators = async(req,res)=>{
    try{
        const allCreators = await creators.find()
        if(!allCreators){
            res.json({message:"No Creator"})
        }

        res.json({message:"All Creators",allCreators})

    }catch(err){
      console.log("error",err)
      res.status(500).json({error:"An error occurred"})
    }
}

export const deleteCourse = async(req,res)=>{
    try{
        const {courseId} = req.params
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

export const deleteQuiz = async(req,res)=>{
    try{
        const {quizId} = req.params
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







// to be done later
// export const getCourseDetails= async(req,res)=>{
//     try{
//         console.log("handleCourseEditMode")
//     }catch(err){
//         console.log("error",err)
//     }
// }
// export const getQuizDetails= async(req,res)=>{
//     try{
//         console.log("getQuizDetails")
//     }catch(err){
//         console.log("error",err)
//     }
// }

// export const getApprovedCourses= async(req,res)=>{
//     try{
//         console.log("getApprovedCourses")
//     }catch(err){
//         console.log("error",err)
//     }
// }

// export const getApprovedQuizes= async(req,res)=>{
//     try{
//         console.log("getApprovedQuizes")
//     }catch(err){
//         console.log("error",err)
//     }
// }



