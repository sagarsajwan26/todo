import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const adminSchema= new Schema({
    
    username:{
        type:String,
        required:true,
        unique:true
    },
      fullName:{
        type:String,
        required:true
    },
      email:{
        type:String,
        required:true
    },
      password:{
        type:String,
        required:true
    },
    

},{timestamps:true})


adminSchema.pre('save',async function(next){
    try {
        if(!this.isModified("password")) return next()
            this.password= await bcrypt.hash(this.password,10)
        return next()
    } catch (error) {
        console.log(error);
        
    }
})

adminSchema.methods.isPasswordCorrect=async function (password) {
    return bcrypt.compare(password,this.password)
    
}

adminSchema.methods.generateAccessToken= async function (){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
    
}

export const Admin = mongoose.model('Admin',adminSchema)
