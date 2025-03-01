const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:{
            values:["male","female"],
            message:`{VALUE} is not valid gender type`}
    },
    profilePic:{
        type:String,
        default:" "
    }
},{timestamps:true})
const User = mongoose.model("User",userschema)
module.exports= User
   