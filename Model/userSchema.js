import mongoose from 'mongoose';

const enrolledCourseSchema = new mongoose.Schema({
  courseName: {type:String,required:true},
  enrollmentDate:{type:Date,default:Date.now(),required:true},
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  progress: {type:Number,required:true}
});

const testSchema = new mongoose.Schema({
  enrollmentDate:{type:Date,default:Date.now(),required:true},
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: {type:Number,required:true},
  chosedOptions: [{type:String,required:true}]
});

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  photo:{type:String,required:false},
  password: {type:String,required:true},
  phoneNO: {type:Number,required:false},
  role: { type: String, default: 'Normal',required:true},
  status: {type:String,default:true},
  tests: [testSchema],
  enrolledCourses: [enrolledCourseSchema]
});

const users = mongoose.model('User', userSchema);

// module.exports = Users;
export default users
