import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
const socket = io.connect('http://localhost:8080')

const Chat = () => {
    
    const[message,newMessage] = useState('')
    const[room,setRoom] = useState('')
    const[chat,newChat] = useState([])
    const {id} = useParams()
    console.log(id)

     const sendMessage = () =>{
        socket.emit("message",{message,id})
     }

     const joinRoom = () =>{
        if(room !== null){
            socket.emit("join-room",room)
        }
     }
     
     useEffect(() => {
        if(id !== null){
            socket.emit("join-room",id)
        }
     },[id])

     useEffect(()=>{
        socket.on('frontend-message',(data)=>{
            console.log("recevied")
            newChat(prevChat => [...prevChat, data.message]);
        })

        return () => {
            socket.off();
          };

     },[socket])

     useEffect(()=>{
        console.log(chat)
     },[chat])

  return (
    <div>
      <h1>Chat</h1>
      <div className='chat-box'>
        <div className='comments'>
        {
            chat.map((value,index) => (
                <p key={index}>{value}</p>
            ))
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
