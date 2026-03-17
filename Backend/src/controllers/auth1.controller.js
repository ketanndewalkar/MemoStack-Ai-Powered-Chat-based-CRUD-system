import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookieOptions.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import {ApiResponse} from "../utils/api-response.js"

export const signup = asyncHandler(async(req,res) => {
     // req body vrtun data gheyach
     const {name,email,password} = req.body;
     // to validate kraych
     if(!name||!email||!password){
        throw new ApiError(401,"All fields are required")
     }
     // jr validation error asel tr 401 pathvaycha
     //then check kraychi ki email exists krto ka
     const user = await User.findOne({email});
     // jr exists kela tr error throw kraycha normally bad request 401
     if(user){
        throw new ApiError(401,"User already exists..");
     }
     // then user create kraycha
     const newUser = await User.create({
        name,
        email,
        password
     })
     // cretae copy of user without sensitive crediential like refresh token password email token etc
     const data = await User.findById(newUser._id).select("-password")
     // then validate if it is created
     if(!newUser){
        throw new ApiError(500,"Error while creating User..")
     }
     //if no user ssend 500 as error
     //suceess pathvaycha message
     return res.status(201).json(
        new ApiResponse(200,"User created succesfully!",data)
     )
     // email verification 
})

export const login = asyncHandler(async (req,res)=> {
    // req .body vrun data gheyach
    const {email,password} = req.body;
    // validate kraych
    if(!email||!password) {
        throw new ApiError(401,"All Field are required..")
    }
    //then check if user exists
    const user = await User.findOne({email});
    // if no =t found send 404
    if(!user){
        throw new ApiError(404,"User Not found..")
    }
    // compare passwords
    const isMatch = await user.comparePasssword(password);
    // if match not found send error invalid credientials
    if(!isMatch){
        throw new ApiError(401,"Invalid Credentials")
    }
    // call access token genration /**
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save()
    const data = await User.findById(user._id).select("-password -refreshToken")
    // set cookies in response
    res.cookie("accessToken",accessToken,accessTokenOptions)
    .cookie("refreshToken",refreshToken,refreshTokenOptions)
    .status(200).json(
        new ApiResponse(200,"Login Successfully",data)
    )
    // send sucees message
})

export const logout = asyncHandler(async(req,res) => {
    // clearcookies from browser
    // send success response with data as null
})

export const getMe = asyncHandler(async(req,res) => {
    const user = req.user;
    // send success and data
})