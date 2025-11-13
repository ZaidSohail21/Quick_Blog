import jwt from "jsonwebtoken";

const auth=(req,res,next)=>{
    const token=req.headers.authorization;

    try {
        jwt.verify(token,process.env.JWT_SECERT)
        next();
    } catch (error) {
        res.json({success:false,message:"Invalig token"})
    }
}
export default auth;