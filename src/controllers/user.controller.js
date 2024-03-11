import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
    // get user details from front end
    // validation for user data - must in backend
    // check if user already exist: from username and email
    // we can also check for files - if they are required - avatars, cover image, etc
    // upload them to cloudinary
    // create user object
    // call db to insert data
    // remove password and token from response which we're sending back to users
    // check for user creation
    // return response or error

    const {userName, fullName, password, email } = req.body
   
    console.log("userName:", userName);
    

    // if (fullName == "") {
    //     throw new ApiError(400, "full name is required")
    // }
    // or use if block with array

    if ([fullName, userName, email, password].some((field) => 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")

    }
    // return res.status(200).json({
    //     message:"ok"
    // })

    const existedUser = await User.findOne({
        // syntax: $operator: [{},{}]
        $or: [{ userName },{ email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    } 

    // for db, we might get error, and delay so we use async/error handler
    
    const user = await User.create( { 
        fullName,
        userName: userName.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export { registerUser }