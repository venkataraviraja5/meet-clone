import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:8080')

const Chat = () => {
    
    const[message,newMessage] = useState('')
    const[chat,newChat] = useState(["blast"])

     const sendMessage = () =>{
        socket.emit("message",message)
     }
     
     useEffect(()=>{
        socket.on('frontend-message',(data)=>{
            newChat(data)
        })
     },[socket])

  return (
    <div>
      <h1>Chat</h1>
      <div className='chat-box'>
        <div>
         {
          chat.length != 0 ? 
          <div>
            {
                chat.map((value) => (
                    <p>{value}</p>
                ))
            }
          </div> :null
         }
        </div>
        <input type='text' placeholder='Enter Your Chat' className='chat-input'
        onChange={(e) => newMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enter</button>
      </div>
    </div>
  )
}

export default Chat
