import React, { useState } from 'react'
import styles from "./Chat.module.css"
import {useMutation,gql} from "@apollo/client"

const POST_MESSAGE = gql`
  mutation ($userId:String!,$user:String!,$content:String!){
    postMessage(userId:$userId, user:$user, content:$content)
  }
`;


const Chat = () => {
  const [state, setState] = useState({
    userId:"",
    user:"",
    content:"",
  });

const [postMessage] = useMutation(POST_MESSAGE)

const onSend = ()=>{
  if(state.content.length>0){
    postMessage({
      variables: state,
    });
  }
  setState({
    ...state,content:"",
  });
};

  return (
    <div className={ styles.container}>
      <div className='styles.nav'>
        <button> Leave as this user </button>
        <div className={styles.title}>
          <h1>TeleChat App</h1>
          <p>The one time chat app to chat within our Community</p>
        </div>
        <button>Hidden Button</button>

        {/* Message container */}
        <div className={styles.chatContainer}>
          <div className={styles.chatInput}>
            <input 
              type='text'
              name='content'
              onChange={(e)=>{
                setState((prevCurret)=>({
                  ...prevCurret,
                  content:e.target.value,
                }));
              }}
              value={state.content}
              onKeyUp={(e)=>{
                if(e.key===13){
                  onSend()
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Chat
