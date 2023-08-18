import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {type:String,required:true},
    options: [{type:String,required:true}],
    answer: {type:String,required:true}
  });

const users = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true}
})

const quizSchema = mongoose.Schema({
    quizname:{type:String,required:true},
    isDrafted:{type:Boolean,required:true,default:false},
    editMode:{type:Boolean,required:true,default:false},
    status:{type:Boolean,default:false,required:true},
    creatorId:{type:mongoose.Schema.Types.ObjectId,ref:'Creator',required:true},
    creationDate:{type:Date,default: Date.now,required:true},
    thumbnail:{type:String,required:false},
    enrollments:{type:Number,required:false,default:0},
    enrolledusers:[users],
    Rating:{type:Number,required:true,default:0},
    Price:{type:Number,required:true,default:0},
    quizQuestions:[questionSchema]
})

const Quizes = mongoose.model('Quizes',quizSchema)

export {Quizes}