import mongoose from "mongoose"

export const mongoDbConnect = async () =>{
    
    return mongoose.connect(process.env.MONGO_URI);
    
}