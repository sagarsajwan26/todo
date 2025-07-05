import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

export const verifyJWT= async(req,res,next)=>{
    const accessToken = req.cookies.accessToken
    console.log(accessToken);
    if(!accessToken) throw new ApiError(401,"you are not authorize")

        try {
            const decodeToken= await jwt.verify(accessToken,process.env.JWT_SECRET)
         
            
            req.user= decodeToken

            return next()
        } catch (error) {
            console.log(error);
            
        }
    
}