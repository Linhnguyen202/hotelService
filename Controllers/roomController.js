const Room = require('../Models/roomModels.js')
exports.addRoom = async (req, res) => {
    try{
        const newRoom = await Room.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                room: newRoom
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }   
}

exports.getAllRoom = async(req, res) => {
    try{
        const rooms = await Room.find(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                room: rooms
            }
        })
    }
    catch(err){

    }
}

exports.getRoomWithHotel = async(req, res) => {
    if(!req.body.hotels){
        req.body.hotel  = req.params.hotelId   
    }
    try{
        const rooms = await Room.find(req.body)
        res.status(200).json({
            status: 'Success',
            total_results: rooms.length,
            result: rooms
        })
    }
    catch(err){

    }
}