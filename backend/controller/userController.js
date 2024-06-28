import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchem.js";
import { genrateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
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



export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});


export const getAllDoctors = catchAsyncError(async(req, res, next)=>{

    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
      success: true,
      doctors
    });
});


export const getUserDetails = catchAsyncError(async(req, res, next)=>{

  const user = req.puser;
  res.status(200).json({
    success: true,
    user,
  });
})


export const logoutAdmin = catchAsyncError(async(req, res, next)=>{

  res.status(200).cookie("adminToken", "",{
    httpOnly: true,
    expires: new Date(Date.now())
  }).json({
    success: true,
    message: "Admin log out successful",
  })
})


export const logoutPatinet = catchAsyncError(async(req, res, next)=>{

  res.status(200).cookie("patientToken", "",{
    httpOnly: true,
    expires: new Date(Date.now())
  }).json({
    success: true,
    message: "Patient log out successful",
  })
});



export const addNewDoctor  = catchAsyncError(async(req, res, next)=>{

  if(!req.files || Object.keys(req.files).length===0){
    return new ErrorHandler("Doctor Avatar Required");
  }
  const {docAvatar} = req.files;
  const allowedFormats = ['/image/png', 'image/jpeg', '/image/webp']
  if((!allowedFormats.includes(docAvatar.mimetype))){
    return next(new ErrorHandler("File Format is not supported!", 400));
  }

  const {
      firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob,
        doctorDepartment
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please  Provide full details!", 400));
  }

  const isRegistered = await User.findOne({email});

  if(isRegistered){
    new ErrorHandler(
      `${isRegistered.role} already registered as patient`
    , 400)
  }
const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});