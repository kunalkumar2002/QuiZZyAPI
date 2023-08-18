import Express from "express";
import { 
    addNewCourse,
    addNewQuiz,
    updateCourse,
    updateQuiz,
    deleteCourse,
    deleteQuiz,
    draftCourse,
    draftQuiz,
    getCreatedCourses,
    getCreatedCourse,
    getCreatedQuiz,
    getCreatedQuizes,
    getDraftedCourse,
    getDraftedQuiz,
 } from "../controller/creatorApi/creatorApi.js";

 import authCreatorMiddleware from '../middleware/verifyCreator.js'
export const QuizCourserouter =  Express.Router()

QuizCourserouter.post("/add-newCourse",addNewCourse)
QuizCourserouter.post("/add-newQuiz",addNewQuiz)

QuizCourserouter.put("/update-course/:courseId",updateCourse)
QuizCourserouter.put("/update-quiz/:quizId",updateQuiz)
QuizCourserouter.put("/draft-course/:courseId/:action",draftCourse)
QuizCourserouter.put("/draft-quiz/:quizId/:action",draftQuiz)

QuizCourserouter.delete("/delete-course",deleteCourse)
QuizCourserouter.delete("/delete-quiz",deleteQuiz)

QuizCourserouter.get("/get-created-courses",getCreatedCourses)
QuizCourserouter.get("/get-created-course",getCreatedCourse)
QuizCourserouter.get("/get-created-quiz",getCreatedQuiz)
QuizCourserouter.get("/get-created-quizes",getCreatedQuizes)
QuizCourserouter.get("/get-drafted-courses/:courseId",getDraftedCourse)
QuizCourserouter.get("/get-drafted-quiz/:quizId",getDraftedQuiz)