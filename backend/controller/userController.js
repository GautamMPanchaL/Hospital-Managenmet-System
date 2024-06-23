import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchem.js";
import { genrateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncError(async(req, res, next)=>{
    let {
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob,
        role
    } = req.body;

    if(
        !firstName ||
        !lastName || 
        !email ||
        !phone ||
        !password || 
        !gender ||
        !dob || 
        !role
    ){  
        console.log(true);
        return next(new ErrorHandler("Please fill Full Form!", 400));
    }

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("Email Already exists"));
    }

    user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob,
        role
    });
    genrateToken(user, "user Registered", 200, res);
    

});

export const login = catchAsyncError(async (req, res, next)=>{

    const {email, password, role} = req.body;
    
    if( !email || !password || !role){
        return next(new ErrorHandler("Please proveide correct credentials"));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("User not found"), 400);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"), 400);
    }
    if(role!==user.role){
        return next(new ErrorHandler("Invalid role"), 400);
    }
    
    genrateToken(user, "Login successful", 200, res);
    console.log("called")

});