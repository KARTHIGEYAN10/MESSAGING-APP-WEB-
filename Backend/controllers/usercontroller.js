const User = require("../models/usermodel")

const getUserForSidebar=async(req,res)=>{
    try{
        const loggedUserId=req.user._id
        const allusers=await User.find({_id:{$ne:loggedUserId}})
        res.status(200).json(allusers)
    }catch(error){
        console.log("Error in getUsersForSidebar: ",error.message)
        res.status(500).json({error: "Internal server error"})
    }
}
module.exports={getUserForSidebar}