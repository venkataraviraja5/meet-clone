const Room = require('../models/room')
const bcrypt = require("bcryptjs")

exports.postCreateRoomId = async(req,res,next) =>{
  const roomId = req.body.roomId
  const password = req.body.password
  
  const hashPassword = await bcrypt.hash(password,12)

  const newRoom = new Room({
    roomId:roomId,
    password:hashPassword
  })
   await newRoom.save()

   res.status(200).json({result:"room created"})
}

exports.joinRoom = async(req,res,next) =>{
  const joinRoomId = req.body.roomId
  const joinRoomPassword = req.body.password
  //console.log("roomid" + joinRoomId)
  const roomIdResult = await Room.findOne({roomId:joinRoomId})

  if(roomIdResult){
    const passwordValidation = await bcrypt.compare(joinRoomPassword,roomIdResult.password)
    //console.log(passwordValidation)
    if(passwordValidation === true){
      res.status(200).json({result:roomIdResult})
    }
    else{
      res.status(404).json({result:false})
    }
  }
  else{
    res.status(200).json({result:false})
  }

}