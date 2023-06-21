const booking = require('../Models/bookingModel.js')

exports.getAllBooking = async (req, res) => {
    try {
        const allBooking = await booking.find()
        res.status(200).json({
            status: 'success',
            data:{
                booking: allBooking
            }
        })
    }
    catch(err){
        res.status(494).json({
            status: 'failed',
            booking:{
                booking: err
            }
        })
    }
}
exports.getUserBooking = async (req, res) => {
   
    try {
        if(!req.body.user){
            req.body.user = req.params.userId
        }
        const userBooking = await booking.find(req.body)
        res.status(200).json({
            status: 'success',
            data: {
                booking: userBooking
            }
        })
    }
    catch(err){

    }
}


exports.addUserBooking = async (req, res) => {
    try {
        const newBooking = await booking.create(req.body)
        res.status(200).json({
            status: 'Success',
            booking:newBooking
        })     
    }
    catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}