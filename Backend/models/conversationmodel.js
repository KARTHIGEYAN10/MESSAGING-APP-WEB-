const mongoose=require("mongoose")

const conversationschema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]
},{timestamps:true})

const conversation=mongoose.model("conversation",conversationschema)
module.exports=conversation