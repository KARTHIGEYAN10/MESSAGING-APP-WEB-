const conversation = require("../models/conversationmodel")
const Message = require("../models/messagemodel")
const { getReceiverSocketId } = require("../socket/socket")
const { io } = require("../socket/socket");

const sendmessage=async(req,res)=>{
    try{
        const {message}=req.body
        const{id:recieverId}=req.params
        const senderId=req.user._id
        let Conversation  = await conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })
        
        if(!Conversation){
            Conversation=await conversation.create({participants:[senderId,recieverId]})
        }
        const newmessage=await Message.create({
            senderId:senderId,
            recieverId:recieverId,
            message:message
        })
        if(newmessage){
            Conversation.messages.push(newmessage._id)
        }
        await Conversation.save()
        const receiverSocketId=getReceiverSocketId(recieverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newmessage",newmessage)
        }
        res.status(200).json(newmessage)
    }catch(error){
        console.log("Error in sendMessage controller: ",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

const getMessages=async(req,res)=>{
    try{
        const{id:userToChatId}=req.params//recieverId
        const senderId=req.user._id

        const Conversation= await conversation.findOne({participants:{$all:[senderId,userToChatId]}}).populate("messages")
        if(!Conversation){
            return res.status(200).json([])
        }
        res.status(200).json(Conversation.messages);
    }catch(error){
        console.log("Error in sendMessage controller: ",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports={ getMessages, sendmessage };