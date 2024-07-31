import React, { useState } from 'react'
import styles from "./Chat.module.css"
import {useMutation,gql} from "@apollo/client"
import enterImg from "../../assets/enter.png"
import Messages from '../../components/Messages';

const POST_MESSAGE = gql`
  mutation ($userId:String!,$user:String!,$content:String!){
    postMessage(userId:$userId, user:$user, content:$content)
  }
`;


const Chat = ({userName, userId}) => {
  const [state, setState] = useState({
    userId: userId,
    user: userName,
    content:"",
  });

const [postMessage] = useMutation(POST_MESSAGE);

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
      <div className={styles.nav}>
        <div className={styles.title}>
          <h1>TeleChat App</h1>
          <p>The one time chat app to chat within our Community</p>
        </div>
      </div>
      <Messages uId={userId} />
      <div className={styles.chatContainer}>
          <div className={styles.chatInput}>
            <input 
              type='text'
              name='content'
              onChange={(e)=>{
                setState((prevCurrent)=>({
                  ...prevCurrent,
                  content:e.target.value,
                }));
              }}
              value={state.content}
              onKeyUp={(e)=>{
                if(e.key==='Enter'){
                  onSend();
                }
              }}
            />
            <img src={enterImg} alt='enter' onClick={onSend} />
          </div>
        </div>
    </div>
  );
};

export default Chat;
