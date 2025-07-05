import { Admin } from "../models/admin.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const generateToken=async(id)=>{
    if(!id) throw new ApiError(401,"id is missing")
        try {
            const admin = await Admin.findById(id)
            if(!admin) return 
                const accessToken = await admin.generateAccessToken()
                return accessToken
        } catch (error) {
            console.log(error);
            
        }
}


export const createAdmin=AsyncHandler(async(req,res)=>{
    const {email, username, fullName, password} = req.body 
    if(!email || !username||!fullName || !password) throw new ApiError(401,"fields cannot be empty")
        const findAdmin = await Admin.findOne({
            $or:[{email},{username}]
        })
       
        
if(findAdmin) throw new ApiError(401,"user already existed")
 console.log('hi');
    const newAdmin = await Admin.create({
        email,password,username,fullName
    })

        if(!newAdmin) throw new ApiError(401,"internal server error , sorry account not created")
            return res.status(201).json({message:"success",
        newAdmin
            })
})
export const adminLogin=AsyncHandler(async(req,res)=>{
    const {username,password}= req.body 
    console.log(req.body);
    
    if(!username || !password) throw new ApiError(401,"fields cannot be empty")
        const admin = await Admin.findOne({username})
    if(!admin) throw new ApiError(401,"sorry admin details mot found")

        const verifyPassword= await admin.isPasswordCorrect(password)
        if(!verifyPassword) throw new ApiError(401,"invalid credentails")
            const accessToken= await generateToken(admin._id)

        if(!accessToken) return 
        return res.status(200).cookie('accessToken',accessToken).json({message:"success",
            admin
        })

})

export const createUser=AsyncHandler(async(req,res)=>{
    const {username, email,password} = req.body
    if(!username||!email||!password) throw new ApiError(401,"sorry fields cannot be empyt")
        const user= await User.findOne({
    $or:[{email},{username}]})
    if(user) throw new ApiError(401,"user already exist")
        const newUser= await User.create({
    username,
    email,
    password})
    if(!newUser) throw new ApiError(403,"internal server error")

    return res.status(200).json({message:"success",
        newUser
    })

})
export const AssignTask=AsyncHandler(async(req,res)=>{
    
    const adminId = req.user._id
    const admin= await Admin.findById(adminId)
    if(!admin) throw new ApiError(401,"you must login first")
        
        const {assignedTo, title, description,priority} = req.body
        
        if(!assignedTo|| !title || !description||!priority) throw new ApiError(401,"fields are requird")
            const user= await User.findById(assignedTo)
        if(!user) throw new ApiError(401,"user does not exist cannot assign task")
            console.log('i');

        const newTask= await Task.create({
            assignedTo,
            title,
            description,
            priority,
         
            assignedBy:adminId
        })
        
if(!newTask) throw new ApiError(401,'internal server error')

        return res.status(201).json({

            message:"success",
            newTask
        })

})

export const DeleteTask=AsyncHandler(async(req,res)=>{
      const adminId= req.user._id 
    const admin= await Admin.findById(adminId) 
    if(!admin) throw new ApiError(401,"you are not authorize")
    const {id} = req.params 
console.log('this is id from deelet',id);

    if(!id) throw new ApiError(401,'no task found')
        const deleteTask= await Task.findByIdAndDelete(id)
    return res.status(200).json({message:"task successfully deleted"})


})
export const updateTask=AsyncHandler(async(req,res)=>{
    const adminId= req.user._id 
    const admin= await Admin.findById(adminId) 
    if(!admin) throw new ApiError(401,"you are not authorize")
    const {id} = req.params 
    if(!id) throw new ApiError(401,'no task found')
        const {title, description,status, priority,completed,assignedTo}= req.body
    const updateTask= await Task.findByIdAndUpdate(id,{
        title,
        description,
        status, 
        priority,
        assignedTo,
        completed
        
    },{new:true})

    return res.status(200).json({message:'success', updateTask})
})


export const tasks= AsyncHandler(async(req,res)=>{
    const adminId = req.user._id
    const admin = await Admin.findById(adminId)
    if(!admin) throw new ApiError(401,'you are not authorize')
        const tasks = await Task.find().sort({createdAt:-1})
    return res.status(200).json({message:"success",
        tasks
    })
})


export const getUserList= AsyncHandler(async(req,res)=>{
        const adminId = req.user._id
    const admin = await Admin.findById(adminId)
    if(!admin) throw new ApiError(401,'you are not authorize')

        const user= await User.find()
        return res.status(200).json({message:'success',
            user
        })

})