const express = require('express')
const { searchHotel } = require('../Controllers/hotelController.js')
const { getAllRoom, addRoom, getRoomWithHotel } = require('../Controllers/roomController.js')
const router = express.Router({mergeParams:true})


router.route('/').get(getRoomWithHotel).post(addRoom)
router.route('/all').get(getAllRoom)


module.exports = router
