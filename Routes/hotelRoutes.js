const express = require('express')
const { protect } = require('../Controllers/authController.js')
const { getAllHotel, getHotel, addHotel, searchHotel } = require('../Controllers/hotelController.js')
const roomRouter = require('./roomRoutes.js')
const router = express.Router()



router.route('/').get(getAllHotel).post(addHotel)
router.route('/search').get(searchHotel)
router.route('/:id').get(getHotel)


//parent router
router.use('/:hotelId/rooms',roomRouter)

module.exports = router