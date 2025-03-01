import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import toast from 'react-hot-toast'
import useGetConversation from '../hooks/useGetConversation';
import useConversation from '../zustand/useConversation';
const Searchinput = () => {
  const[search,setSearch]=useState('')
  const {setSelectedConversation}=useConversation()
  const {conversations}= useGetConversation()
  const handleSubmit=(e)=>{
    console.log(search)
    e.preventDefault()
    if(!search){
      return
    }
    if(search.length == 0){
      return toast.error('Search term must be at least 3 characters long')
    }
    const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
      setSearch(' ')
    }else{
      toast.error("No such user found!")
    }
  }
  return (
    <form  onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type='text' placeholder='search' className='input input-bordered rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default Searchinput

//starter code
// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";
// const Searchinput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type='text' placeholder='search' className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp className='w-6 h-6 outline-none' />
//         </button>
//     </form>
//   )
// }

// export default Searchinput