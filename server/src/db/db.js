import mongoose from 'mongoose'

export const connectDB  = async()=>{
    try {
        const instance= await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MONGO DB CONNECTION SUCCESSFULL',instance.connections[0].host);
        
        
    } catch (error) {
        console.log('error while connecting to mongodb',error);
        
        
    }
}