import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const[roomId,setRoomId] = useState('')
    const[password,setPassword] = useState('')
    const[joinRoomId,setJoinRoomId] = useState('')
    const[roomPassword,setRoomPassword] = useState('')
    const navigate = useNavigate()
    

    const createNewRoom = async() =>{
       const fetchUrl = await fetch('http://localhost:8080/createroom',{
         method:"POST",
         headers:{
            "Content-Type" : "application/json"
         },
         body:JSON.stringify({
            roomId:roomId,
            password:password
         })
       })
       if(fetchUrl.ok){
        const jsonfile = await fetchUrl.json()
        console.log(jsonfile)
       }
       else{
        console.log("not fetched")
       }
    }

    const joinRoom = async() =>{
        const fetchUrl = await fetch('http://localhost:8080/joinroom',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                roomId:joinRoomId,
                password:roomPassword
            })
        })
        const fetchresult = await fetchUrl.json()
        if(fetchresult.result === false){
            console.log("no room exits")
        }
        else{
            navigate("/" + joinRoomId)
        }
       // console.log(fetchresult.result)
    }

  return ( 
    <div>
      <h1>Create</h1>
      <input type='text' placeholder='Enter Your Room Id' onChange={(e) => setRoomId(e.target.value)}/>
      <input type='text' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={createNewRoom}>Create Room</button>
      <hr></hr>
      <input type='text' placeholder='Enter your id' onChange={(e) => setJoinRoomId(e.target.value)}/>
      <input type='text' placeholder='Enter Your Password' onChange={(e) => setRoomPassword(e.target.value)} />
      <button onClick={joinRoom}>Enter</button>
    </div>
  )
}

export default Home
