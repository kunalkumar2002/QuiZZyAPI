import  Express  from "express";
import { 
    fetchAllCourses,
    fetchAllQuizes,
    fetchPendingCourses,
    fetchPendingQuizes,
    UpdateCourseStatus,
    UpdateQuizStatus,
    handleCourseEditMode,
    handleQuizEditMode,
    getAllUsers,
    getAllCreators,
    deleteCourse,
    deleteQuiz,
    // getCourseDetails,
    // getQuizDetails,
    // getApprovedCourses,
    // getApprovedQuizes,
} from "../controller/SuperAdminApi/superAdminApi.js";
export const adminRoutes = Express.Router()

adminRoutes.put("/handle-course-Edit-mode",handleCourseEditMode)
adminRoutes.put("/handle-quiz-Edit-mode",handleQuizEditMode)
adminRoutes.put("/update-quiz-status/:quizId",UpdateQuizStatus)
adminRoutes.put("/update-course-status/:courseId",UpdateCourseStatus)

adminRoutes.delete("/delete-course/:courseId",deleteCourse)
adminRoutes.delete("/delete-quiz/:quizId",deleteQuiz)

adminRoutes.get("/fetch-all-courses",fetchAllCourses)
adminRoutes.get("/fetch-all-quizes",fetchAllQuizes)
adminRoutes.get("/fetch-pending-courses",fetchPendingCourses)
adminRoutes.get("/fetch-pending-quizes",fetchPendingQuizes)
adminRoutes.get("/all-users",getAllUsers)
adminRoutes.get("/all-creators",getAllCreators)


// to be done later
// adminRoutes.get("/get-course-details/:courseid",getCourseDetails)
// adminRoutes.get("/get-quiz-details/:quizId",getQuizDetails)
// adminRoutes.get("/get-approved-courses",getApprovedCourses)
// adminRoutes.get("/get-approved-quizes",getApprovedQuizes)
