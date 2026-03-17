import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookieOptions.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
    const newUser = await user.create({name, email, password});

    res.status(201).json({
      message: "user registered successfully",
      data:newUser
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const existUser = await user.findOne({ email });
    console.log(existUser)
    if (!existUser) {
      return res.status(400).json({
        message: "No User Exists",
      });
    }
    const isMatch = await existUser.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(existUser._id);
    const refreshToken = generateRefreshToken(existUser._id);

    existUser.refreshToken = refreshToken;
    await existUser.save();
    const exsitingUser1 = await user.findOne({email}).select("-password -refreshToken");
    res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .status(200)
      .json({
        message: "User Login Successfully !!!",
        data: exsitingUser1,
      });
  } catch (error) {
    console.log(error);
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ message: "no token" });
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const existUser = await user.findById(decoded.id);
    if (!existUser || existUser.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }
    const accessToken = generateAccessToken(existUser._id);
    res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .status(200)
      .json({ message: "session refreshed" });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    const existUser = await user.findOne({ refreshToken: token });

    if (existUser) {
      existUser.refreshToken = null;
      await existUser.save();
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({
      message: "Logged out",
    });
  } catch (error) {
    console.log(error)
  }
};
