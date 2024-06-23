import mongoose from "mongoose";
import validator from "validator";

const messageSchem = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must contain at least 3 characters"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must contain at least 3 characters"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Invalid Email"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [11],
        maxLength: [11]
    },
    message:{
        type: String,
        require: true,
    }
});

export const Message = mongoose.model("Message", messageSchem);