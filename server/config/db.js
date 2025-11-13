import mongoose from "mongoose";

const ConnectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log(`DB Connected `)
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/quikblog`)
    } catch (error) {
        console.log(error.message)
    }
}
export default ConnectDB;