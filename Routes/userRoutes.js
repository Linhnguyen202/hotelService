const express = require('express')
const { signUp, login } = require('../Controllers/authController.js')
const { getAllUser } = require('../Controllers/UserController.js')
const bookingRouter = require('./bookingRoutes.js')
const favorHotelRouter = require('./favorHotelRoutes.js')
const router = express.Router()

router.route('/').get(getAllUser).post()
router.route('/:id').get().post().patch()


// auth
router.route('/signUp').post(signUp)
router.route('/signIn').post(login)


//
router.use('/:userId/booking',bookingRouter)
router.use('/:userId/favorHotel',favorHotelRouter)

module.exports = router