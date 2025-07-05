import mongoose,{Schema} from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true },    
  password: { type: String, required: true },             
         
},{timestamps:true});




userSchema.pre('save',async function(next){
    try {
        if(!this.isModified("password")) return next()
            this.password= await bcrypt.hash(this.password,10)
        return next()
    } catch (error) {
        console.log(error);
        
    }
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return bcrypt.compare(password,this.password)
    
}

userSchema.methods.generateToken= async function (){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
    
}

export const User= mongoose.model('User',userSchema)
