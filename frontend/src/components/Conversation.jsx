import React from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({ conversation,lastIdx}) => {
    const {selectedConversation,setSelectedConversation} = useConversation()
    const isSelected=selectedConversation?._id === conversation._id
    const {onlineUsers}=useSocketContext()
    const isonline = onlineUsers.includes(conversation._id)
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
      onClick={()=>setSelectedConversation(conversation)}>
        <div className={`avatar ${isonline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              alt='profile'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullname}</p>
            {/* <span className='text-xl'>*-*</span> */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;


//starter code
// import React from 'react'

// const Conversation = () => {
//   return (
//     <>
//     <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
//         <div className='avatar online'>
//             <div className='w-12 rounded-full'>
//                 <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt=''/>
//             </div>
//         </div>

//         <div className='flex flex-col flex-1'>
//             <div className='flex gap-3 justify-between'>
//                 <p className='font-bold text-gray-200'>John Doe</p>
//                 <span className='text-xl'>*-*</span>
//             </div>
//         </div>
//     </div>
//     <div className='divider my-0 py-0 h-1'/>
//     </>
//   )
// }

// export default Conversation