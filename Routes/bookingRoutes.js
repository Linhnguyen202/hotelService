const express = require('express')
const { protect } = require('../Controllers/authController.js')
const {getAllBooking, getUserBooking, addUserBooking} = require('../Controllers/bookingController.js')

const router = express.Router({mergeParams: true})

router.route('/').get(protect,getUserBooking).post(protect,addUserBooking)
router.route('/all').get(getAllBooking)

module.exports = router