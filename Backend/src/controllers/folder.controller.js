import folder from "../models/folder.model.js";

export const fetchAllFolder = async (req, res) => {
  try {
    const existUser = req.user;
    const folders = await folder.find({ userId: existUser.id });
    res.status(200).json({
      message: "Folders fetched Successfully!!!",
      data: folders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const Folder = await folder.findById(folderId);
    res.status(200).json({
      message: "Fetched Folder Successfully",
      data:Folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const newFolder = await folder.create({ name, userId });
    await newFolder.save();
    res.status(201).json({
      message: "Created Folder Successfully",
      data: newFolder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (req,res) => {
  try {
    const {folderId} = req.params;
    const deletedFolder = await folder.findByIdAndDelete(folderId);
    res.status(200).json({
      message:"Deleted folder Successfully",
      data:deletedFolder
    })
  } catch (error) {
    console.log(error)
  }
};

export const updateFolders =async (req,res) =>{
  try {
    const {folderId} = req.params;
    const {name} = req.body;
    console.log(req.params,req.body)
    const updatedFolder = await folder.findByIdAndUpdate(folderId,{
      name
    },{new:true})
    console.log(updatedFolder)
    res.status(200).json({
      message:"Updated Successfully",
      data:updatedFolder
    })
  } catch (error) {
    console.log(error)
  }
}
