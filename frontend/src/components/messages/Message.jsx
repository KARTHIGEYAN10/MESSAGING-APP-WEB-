import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

const Message = ({message}) => {
  const {authUser}= useAuthContext()
  const {selectedConversation}=useConversation()
  const fromMe=message.senderId === authUser._id
  const chatClassName=fromMe ? 'chat-end' : 'chat-start'
  const profilepic=fromMe ? authUser.profilepic : selectedConversation?.profilepic;
  const bubbleBgColor=fromMe ? 'bg-blue-500' : '';
  const date=new Date(message.updatedAt)
  let hour=date.getHours()
  if(hour < 10){
    hour=`0${hour}`
  }
  const min=date.getMinutes()
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}/>
            </div>
        </div>
        <div className={`chat-bubble text-white  ${bubbleBgColor}`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{hour > 12 ? (hour-12) : String(hour).padStart(2, "0")}:{min < 10 ? `0${min}`:min}</div>
    </div>
  )
}

export default Message