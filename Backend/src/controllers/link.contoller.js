import link from "../models/link.model.js";

export const fetchAllLinks = async (req, res) => {
  try {
    const existUser = req.user;
    const allLink = await link.find({ userId: existUser.id });
    res.status(200).json({
      message: "fetched All Links Successfully",
      data: allLink,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLinkById = async (req, res) => {
  try {
    const { linkId } = req.params;
    if (!linkId) {
      res.status(400).json({
        message: "Invalid Request",
      });
    }
    const Link = await link.findById(linkId);
    res.status(200).json({
      message: "fetched Link Successfully",
      data: Link,
    });
  } catch (error) {
    console.log(err);
  }
};

export const createLink = async (req, res) => {
  try {
    const activeUser = req.user;
    const { name, Url } = req.body;
    if (!name || !Url) {
      res.status(400).json({
        message: "Invalid Request",
      });
    }
    const newLink = await link.create({ name, Url,userId:activeUser.id });
    await newLink.save();
    res.status(201).json({
      message: "Created Link Successfully",
      data: newLink,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const activeUser = req.user
    const { name, Url } = req.body;
    if (!name || !Url) {
      res.status(400).json({
        message: "Invalid Request",
      });
    }
    const updatedLink = await link.findByIdAndUpdate(linkId,{
        name,Url
    },{new:true})

    res.status(200).json({
        message:"Updated Link Successfully",
        data:updatedLink
    })
  } catch (error) {
    console.log(error)
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const activeUser = req.user
    const deletedLink = await link.findByIdAndDelete(linkId)

    res.status(200).json({
        message:"Updated Link Successfully",
        data:deletedLink
    })
  } catch (error) {
    console.log(error)
  }
};
