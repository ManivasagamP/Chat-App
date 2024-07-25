import React from 'react'
import styles from "./Home.module.css"

const Home = ({userName,setUserName,setStartChat,userId}) => {
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
                        onchange={(e)=> setUserName(e.target.value)}
                    />
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
