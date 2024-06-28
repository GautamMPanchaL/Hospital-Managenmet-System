import { User } from "../models/userSchem.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
export const isAdminAuthenticated = catchAsyncError(async(req, res, next)=>{
    const token = req.cookies.admintoken;
    if(!token){
        return next (new ErrorHandler("Admin Not Authenticated!", 400));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken.id);
    if(req.user.role!="Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403))
    }

    next();

});

export const isPatientAuthenticated = catchAsyncError(async(req, res, next)=>{
    const token = req.cookies.admintoken;
    if(!token){
        return next (new ErrorHandler("Patient Not Authenticated!", 400));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken.id);
    if(req.user.role!="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403))
    }
    next();

});