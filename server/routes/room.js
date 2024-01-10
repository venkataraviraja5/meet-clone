const express = require("express")
const router = express.Router()
const newRoom = require("../controllers/room")

router.post("/createroom",newRoom.postCreateRoomId)
router.post("/joinroom",newRoom.joinRoom)

module.exports = router