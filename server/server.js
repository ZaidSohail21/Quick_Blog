import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDB from './config/db.js'
import AdminRouter from './route/admin.route.js'
import blogRouter from './route/blog.route.js'
dotenv.config({
    path:'./.env'
})
const app=express()

//middlewares
app.use(cors())
app.use(express.json())

//Connections
ConnectDB()
const PORT =process.env.PORT||4000; 

//Routes
app.get('/',(req,res)=>{
    res.json("Running successfully")
})
app.use('/api/admin',AdminRouter)
app.use('/api/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`Api is running on port : ${PORT}`)
})


export default app;