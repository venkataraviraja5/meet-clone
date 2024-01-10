const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomId = new Schema({
    roomId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("room",roomId)