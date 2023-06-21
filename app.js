const express = require('express')
const slugify = require('slugify')
const morgan = require('morgan')
const cors = require('cors')
const hotelRouter = require('./Routes/hotelRoutes.js')
const userRouter = require('./Routes/userRoutes.js')
const roomRouter =  require('./Routes/roomRoutes.js')
const bookingRouter = require('./Routes/bookingRoutes.js')
const favorHotelRouter = require('./Routes/favorHotelRoutes.js')
const globalErrorHandler = require('./Controllers/errorControllers.js')

const app = express()
// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// route
app.use('/api/v1/user',userRouter)
app.use('/api/v1/hotels',hotelRouter)
app.use('/api/v1/rooms',roomRouter)
app.use('/api/v1/booking',bookingRouter)
app.use('/api/v1/favorHotel',favorHotelRouter)
app.use(globalErrorHandler)

module.exports = app