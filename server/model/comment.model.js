import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    name:{type:String,required:true},
    content:{type:String,required:true},
    isApproved:{type:Boolean,default:false},
})

export const comment=mongoose.model('comment',commentSchema)
