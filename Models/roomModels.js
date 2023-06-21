const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    numberRoom: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    guestNumer: {
        type: Number,
        required: true,
        default: 2
    },
    description: {
        type: String
    },
    price: {
        type: Number,
    },
    priceDiscount: {
        type: Number
    },
    rate: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotels',
        required: true
    },
    createdAt: {
        type:Date,
        default : Date.now()
    }

})

const Room = mongoose.model('room',roomSchema)
module.exports = Room;