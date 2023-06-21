const mongoose = require('mongoose')
const Hotel = require('./hotelModel.js')
const favorSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotels',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
})
favorSchema.pre('save', async function(next){
    const hotelId= this.hotel
    this.hotel= await Hotel.findById({_id: hotelId})
    next()
})
const favorHotel = mongoose.model("favorHotel", favorSchema)
module.exports = favorHotel