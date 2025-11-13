import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllerter/admin.controller.js";
import auth from "../middleware/auth.js";

const AdminRouter=express.Router();

AdminRouter.post('/login',adminLogin)
AdminRouter.get('/comments',getAllComments)
AdminRouter.get('/blogs',getAllBlogsAdmin)
AdminRouter.get('/delete-comment',auth,deleteCommentById)
AdminRouter.get('/approve-comment',auth,approveCommentById)
AdminRouter.get('/dashboard',getDashboard)


export default AdminRouter;