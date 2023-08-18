import Express  from "express";
import { 
    getCourses,
    getCourse,
    getQuizes,
    getQuiz,
    getEnrolledCourses,
    getTestDetails,
    getTestRecords,
    testSubmission,
    saveCourseProgress
 } from "../controller/UsersApi/usersApi.js";
import authMiddleware from "../middleware/verifyUser.js";

export const userRoutes = Express.Router()

userRoutes.get("/get-courses",getCourses)
userRoutes.get("/get-course/:courseId",getCourse)
userRoutes.get("/get-quizes",getQuizes)
userRoutes.get("/get-quiz/:quizId",getQuiz)
userRoutes.get("/get-enrolled-courses/:userId",getEnrolledCourses)
userRoutes.get("/get-testDetails/:userId",getTestDetails)
userRoutes.get("/get-testRecords/:userId",getTestRecords)

userRoutes.post("/submit-test/:userId",testSubmission)
userRoutes.post("/save-course-progress/:userId/:courseId",saveCourseProgress)





