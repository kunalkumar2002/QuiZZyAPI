import mongoose from "mongoose";


const createdQuizSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizes' }
});

const createdCourseSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }
});

const creatorSchema = new mongoose.Schema({
  name: {type:String,required:true},
  photo:{type:String,required:false},
  email: {type:String,reuired:true},
  contactEmail:{type:String,required:true},
  password: {type:String,required:true},
  active: {type:Boolean,default:false,required:true},
  role: { type: String, default: 'Creator',required:true },
  createdQuizzes: [{type:createdQuizSchema,required:false}],
  createdCourses: [{type:createdCourseSchema,required:false}]
});

const creators = mongoose.model('Creators', creatorSchema);

export default creators;
