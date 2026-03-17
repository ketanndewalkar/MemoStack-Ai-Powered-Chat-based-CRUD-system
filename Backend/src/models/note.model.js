import mongoose from "mongoose"
import { noteDefaultStructure } from "../utils/noteDefaultStructure.js";

const noteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    folderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Folder"
    },
    content:{
        type:Object,
        required:true,
        default:noteDefaultStructure
        
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamp:true})

export default mongoose.model("Note",noteSchema);