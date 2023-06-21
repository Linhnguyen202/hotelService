const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'a field must have a name']
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
    image: {
        type: String
    },
    type:{
        type: String,
        default: "Popular",
        enum: ["Popular","New","Normal","Trending"]
    },  
    description : {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default : Date.now()
    }

})
const Hotel = mongoose.model("hotels", hotelSchema)
module.exports = Hotel