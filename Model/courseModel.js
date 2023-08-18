import mongoose from "mongoose"

const courseQuestionSchema = new mongoose.Schema({
    question:{type:String,required:true},
    options:[{type:String,required:true}],
    answer:{type:String,required:true},
    videoLink:{type:String,required:true},
    otherResourses:[{type:String,required:false}]
  });
  
const users = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true}
})

const courseSchema = mongoose.Schema({
    courseName:{type:String,required:true},
    creatorId:{type:mongoose.Schema.Types.ObjectId,ref:'Creator',required:true},
    status:{type:Boolean,default:false,required:true},
    queryMail:{type:String,required:true},
    isDrafted:{type:Boolean,required:true,default:false},
    editMode:{type:Boolean,required:true,default:false},
    creationDate:{type:Date,default: Date.now,required:true},
    thumbnail:{type:String,required:false},
    enrollments:{type:Number,required:false,default:0},
    enrolledUsers:[users],
    rating:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0},
    courseQuestions:[courseQuestionSchema]
})

const Courses = mongoose.model('Courses',courseSchema)

export default Courses