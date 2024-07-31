import React from 'react'
import styles from "./Home.module.css";
import chatImg from "../../assets/chat.jpeg"
import msgImg from "../../assets/msg.png"


const Home = ({userName,setUserName,setStartChat,userId}) => {

    const startChat = ()=>{
        if (!userName){
            alert("Please enter your name !!");
            return;
        }
        const data ={
            userName,
            id:userId,
        };
        sessionStorage.setItem("user",JSON.stringify(data));
        setStartChat(true);
    };

  return (
    <div className={styles.container}>
        <nav className={styles.navbar}>
            <h3>TeleChat</h3>
        </nav>
        <div className={styles.home}>
            <div className={styles.left}>
                <h1>TeleChat for Community</h1>
                <p>A Chat application using Graphql Subscriptions and Web sockets for realtime chat. One click and chat with in our telechat community</p>
                <div className={styles.inputcontainer}>
                    <input
                        type="text"
                        value={userName}
                        placeholder="Enter your Name "
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                    <button onClick={startChat}>
                        <img src={msgImg} alt='message' />
                    </button>
                </div>
            </div>
            <div className={styles.right}>
                <img src={chatImg} alt='chat' />
            </div>
        </div>
    </div>
  );
};

export default Home
