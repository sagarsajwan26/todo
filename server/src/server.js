import 'dotenv/config'
import express from 'express'
import { connectDB } from './db/db.js'
import cors from 'cors'

const PORT = process.env.PORT
const app= express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['POST','GET','PUT','DELETE','PATCH'],
    credentials:true

}))



import adminRouter from './routes/admin.route.js'
import cookieParser from 'cookie-parser'
app.get('/',(req,res)=>{
    res.send("hi")
})
app.use('/api/v1/admin',adminRouter)


connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log('SERVER STARTED AT ',PORT);
    
})
})

 