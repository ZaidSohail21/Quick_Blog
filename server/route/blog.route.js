import express from "express";
import { addBlog, addComment, DeleteBlogById, generateContent, getAlllBlogs, getBlogById, getBlogComment, togglePublish } from "../controllerter/addBlog.controller.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter=express.Router();

blogRouter.post('/add',upload.single('image'),addBlog)
blogRouter.get('/all',getAlllBlogs);
blogRouter.post('/delete',auth,DeleteBlogById);
blogRouter.post('/toggle-publish',auth,togglePublish);

blogRouter.post('/add-comment',addComment);
blogRouter.post('/comment',getBlogComment);
blogRouter.post('/generate',generateContent);
blogRouter.get('/:blogId',getBlogById);


export default blogRouter;