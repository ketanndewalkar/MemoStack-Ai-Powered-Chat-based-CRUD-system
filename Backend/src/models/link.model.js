import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  Url:{
    type:String,
    required:true
  }
},{timestamp:true});

export default mongoose.model("Link",linkSchema)
