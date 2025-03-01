import React, { useEffect } from 'react';
import Conversation from './Conversation';
import useGetConversation from '../hooks/useGetConversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  useEffect(() => {
    console.log(conversations);
  }, [conversations]); // Added missing dependency

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation key={idx} conversation={conversation} lastIdx={idx === conversations.length - 1} />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  );
};

export default Conversations;


// Starter code
// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation />
//         <Conversation />
//         <Conversation />
//     </div>
//   )
// }

// export default Conversations