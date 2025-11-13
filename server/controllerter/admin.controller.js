import jwt from "jsonwebtoken";
import { blog } from "../model/blog.model.js";
import { comment } from "../model/comment.model.js";

export const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        
        if(email!==process.env.ADMIN_EMAIL ||password !==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Invalid Password or Email"})
        }
        const token=jwt.sign({email},process.env.JWT_SECERT)
        res.json({success:true,message:`TOken Created Successfully`,token:token})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await blog.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "GET all blogs successfully",
      blogs
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


export const getAllComments=async(req,res)=>{
    try {
        const comments=await comment.find({}).populate('blog').sort({createdAt:-1})
        res.json({success:true,comments})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const getDashboard=async(req,res)=>{
    try {
        const recentBlogs=await comment.find({}).sort({createdAt:-1}).limit(5);
        const blogs=await blog.countDocuments();
        const comments=await comment.countDocuments();
        const drafts=await blog.countDocuments({isPublished:false});

        const dashboard={
            blogs,comments,drafts,recentBlogs
        }
        res.json({success:true,dashboard})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


export const deleteCommentById=async(req,res)=>{
    try {
        const {id}=req.body;
        await comment.findByIdAndDelete(id);
        res.json({success:true,message:"Successfully deleted the commment"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


export const approveCommentById=async(req,res)=>{
    try {
        const {id}=req.body;
        await comment.findByIdAndUpdate(id,{isApproved:true});
        res.json({success:true,message:"Successfully Upgraded the commment"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

