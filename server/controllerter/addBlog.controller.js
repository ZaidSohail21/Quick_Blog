import fs from "fs"
import img from "../config/imagekit.js";
import { blog } from "../model/blog.model.js";
import { comment } from "../model/comment.model.js";
import main from "../config/gemini.js";


export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, category, description, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!description) {
      return res.json({ success: false, message: "ImageFile Missing fields" });
    }

    if (!title || !category || !description || !imageFile) {
      return res.json({ success: false, message: "Missing fields" });
    }

    // Debug
    console.log("File received:", imageFile);

    const fileBuffer = imageFile.buffer || fs.readFileSync(imageFile.path);

    const response = await img.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    console.log("ImageKit Upload:", response);

    if (!response.url) {
      return res.json({ success: false, message: "Image upload failed" });
    }

    const optimizedImageUrl = img.url({
      src: response.url,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl, // ✅ Now always set
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAlllBlogs=async(req,res)=>{
    try {
        const user=await blog.find({isPublished:true});
        if(!user){
            res.json({success:false,message:"User not found"})
        }
        res.json({success:true,message:"GET ALL DATA SUCCESSFULLY RUNS ",user})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params; // ✅ note: must match the route
    const blogData = await blog.findById(blogId);

    if (!blogData) {
      console.log("Blog not found");
      return res.json({ success: false, message: "Blog not found" });
    }

    console.log("Blog found:", blogData);
    return res.json({
      success: true,
      message: "Blog fetched successfully",
      blog: blogData, // ✅ this is what frontend will use
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



export const DeleteBlogById=async(req,res)=>{
    try {
        const {blogid}=req.body;
        const user1=await blog.findById(blogid);
        if(!user1){
            res.json({success:false,message:"User not found"})
        }
        await blog.findByIdAndDelete(blogid);

        //Delete all comments asssociated wirh it
        await comment.deleteMany({blog:id});

        const user2=await blog.findById(blogid);
        if(user2){
            res.json({success:false,message:"User not Deleted"})
        }
        res.json({success:true,message:"Deleted ID SUCCESSFULLY RUNS "})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const togglePublish=async(req,res)=>{
    try {
        const {id}=req.body;
        const blogs=await blog.findById(id);
    
        if(!blogs){
            res.json({success:false,message:"Blog not Founded"})
        }
        blogs.isPublished = !blogs.isPublished;
        blogs.save()
        res.json({success:true,message:"Toggle SUCCESSFULLY RUNS ",blogs})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const addComment=async(req,res)=>{
    try {
        const {blog,name,content} =req.body;
        if(!blog|| !name || !content){
            res.json({success:false,message:"Misiing credentials"})
        }
        await comment.create({blog,name,content})
        res.json({success:true,message:"comment added successfully "})
        
    } catch (error) {
           res.json({success:false,message:error.message})
    }
}

export const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.body; // works with POST
    if (!blogId) {
      return res.json({ success: false, message: "Missing blogId" });
    }

    const comments = await comment
      .find({ blog: blogId, isApproved: true })
      .sort({ createdAt: -1 });


    return res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const content = await main(
      `${prompt} — Generate a blog content for this topic in simple text format`
    );

    if (!content) {
      return res.json({ success: false, message: "Failed to generate content" }); 
      
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
