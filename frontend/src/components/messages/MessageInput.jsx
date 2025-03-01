import React, { useState } from 'react'
import {BsSend} from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'
const MessageInput = () => {
  const [message,setMessage]=useState("")
  const {sendMessage,loading}=useSendMessage()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!message){
      return
    }
    let res = await sendMessage(message)
    if(res){
      console.log(res)
    }
    setMessage("");
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type='text' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Send a message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <div className='loading loading-spinner'></div> : <BsSend style={{color:"white"}}/>}
            </button>
        </div>
    </form>
  )
}

export default MessageInput



//Starter code
// import React from 'react'
// import {BsSend} from "react-icons/bs"
// const MessageInput = () => {
//   return (
//     <form className='px-4 my-3'>
//         <div className='w-full'>
//             <input type='text' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Send a message'/>
//             <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
//                 <BsSend />
//             </button>
//         </div>
//     </form>
//   )
// }

// export default MessageInput