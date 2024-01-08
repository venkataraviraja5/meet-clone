import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const[room,setRoom] = useState('')

  return (
    <div>
      <h1>Home</h1>
      <input type='text' placeholder='Enter your id' onChange={(e) => setRoom(e.target.value)}/>
      <Link to={"/" + room}><button>Enter</button></Link>
    </div>
  )
}

export default Home
