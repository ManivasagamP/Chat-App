import React, { useContext, useState } from 'react'
import {v4 as uuid} from "uuid"
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";

const App = () => {

  const [userName,setUserName]=useState("");
  const [userId,setUserId]=useState(uuid());
  const [startChat,setStartChat] = useState(false);

  if(startChat){
    return (<Chat userName={userName} userId={userId}/>);
  }
  return (
    <Home 
    userName={userName}
    setUserName={setUserName}
    setStartChat={setStartChat}
    userId={userId}
    />
  );
};

export default App
