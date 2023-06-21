const mongoose = require('mongoose')
const User = require('./userModel.js')
const Hotel = require('./hotelModel.js')
const Room = require('./roomModels.js')
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a field must have a name']
    },
    totalPrice: {
        type: Number,
        required: [true, 'a field must have a totel']
    },
    price: {
        type: Number,
        required : [true, 'a field must have a price']
    },
    status: {
        type: String,
        required : [true, 'a field must have a status'],
        default: "Current",
        enum: ["Current","Past","Cancel"]
    },
    description: {
        type: String,
    },
    numberRoom: {
        type: Number,
    },
    guestNumber: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
        default: "Pay when you stay"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotels',
        required: true
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: 'room',
        required: true
    },
    createdAt: {
        type:Date,
        default : Date.now()
    }
})
bookingSchema.pre('save', async function(next){
    const userId = this.user
    const hotelId= this.hotel
    const roomId = this.room
    this.user = await User.findById({_id: userId})
    this.hotel= await Hotel.findById({_id: hotelId})
    this.room = await Room.findById({_id:roomId})
    next()
})
const booking = mongoose.model("booking", bookingSchema)
module.exports = booking
