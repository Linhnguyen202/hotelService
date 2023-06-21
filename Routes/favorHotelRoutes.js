const express = require('express')
const { protect } = require('../Controllers/authController.js')
const { addFavorHotel, getAllFavor,removeFavorHotel, checkFavorExist } = require('../Controllers/favorHotelController.js')
const router = express.Router({mergeParams: true})

router.route('/').post(protect,addFavorHotel).get(protect, getAllFavor)
router.route('/:id').get(checkFavorExist).delete(protect,removeFavorHotel)
module.exports = router 