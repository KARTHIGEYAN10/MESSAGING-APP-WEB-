import { useState } from "react"
import useConversation from "../zustand/useConversation"
import axios from "axios"

const useSendMessage=()=>{
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation()
    const sendMessage = async(message)=>{
        setLoading(true)
        try{
            console.log(message)
            const res=await axios.post(`/api/message/send/${selectedConversation._id}`,{message})
            console.log(res)
            setMessages([...messages,res.data])
            return res.data
        }catch(error){
            console.log(error)
            return error
        }finally{
            setLoading(false)
        }
    }
    return{sendMessage,loading}
}

export default useSendMessage