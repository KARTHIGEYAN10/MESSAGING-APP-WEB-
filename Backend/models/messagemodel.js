const mongoose=require("mongoose")

const messageschema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true}
)
const Message=mongoose.model("Message",messageschema)
module.exports=Message