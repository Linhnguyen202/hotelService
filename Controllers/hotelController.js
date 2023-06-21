const { count } = require('../Models/hotelModel.js')
const Hotel = require('../Models/hotelModel.js')
const Room = require('../Models/roomModels.js')
exports.getAllHotel = async(req, res) => {
    try{
            const queryObj = {...req.query}
            // 1,filtering
            const excludedFields = ['page','sort','limit','fields']
            excludedFields.forEach(el => delete queryObj[el]) 

            // 2, advanced fitering (gte, gt,lte, lt)
            let queryStr = JSON.stringify(queryObj)
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
            console.log(JSON.parse(queryStr))
            let query  =  Hotel.find(JSON.parse(queryStr))

             // 3,sorting 
            if(req.query.sort){
                query = query.sort(req.query.sort)     
            }
            else{
                query = query.sort('-createdAt')
            }
            //4) limit
            if(req.query.fields){
                const fields = req.query.fields.split(',').join(' ')
                query = query.select(fields)
            }
            else{
                query = query.select('-__v')
            }

             //4 paginate
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 10;
            const skip = (page - 1) * limit
            query = query.skip(skip).limit(limit)      
    
            const hotel = await query
            res.status(200).json({
            status: 'Success',
            total_result: hotel.length,
            result: hotel 
            
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}

exports.addHotel = async (req, res) => {
    try{
        const newHotel = await Hotel.create(req.body)
        res.status(200).json({
            status: 'Success',
            
        })
    }
    catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }   
}

exports.getHotel = async (req, res)=> {
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data:{ 
                hotel: hotel
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}

exports.searchHotel = async (req, res) => {
    const {city, guestNumber} = req.query
    const stats = await Hotel.aggregate([
        {
            $match: {
                 city : {$eq : city}
            }
        },
        {
            $lookup: {
                from: "rooms",
                localField: "_id",
                foreignField: "hotel",
                as: "rooms",
                pipeline: [
                    {
                        $match: { guestNumer : {$eq : guestNumber*1}}
                    }
                ]
            }
        },
        {
            $unwind: "$rooms"
        }, 
        {
            $group: {
               _id: "$_id",
               hotel: { $first: "$$ROOT" }
            }
        },
        {
            $project: { 
                "_id": "$hotel._id",
                "name": "$hotel.name",
                "price": "$hotel.price",
                "priceDiscount": "$hotel.priceDiscount",
                "rate":  "$hotel.rate",
                "type":  "$hotel.type",
                "description":  "$hotel.description",
                "city":  "$hotel.city",
                "address":  "$hotel.address",
                "createdAt":  "$hotel.createdAt",
            }
        },
      
       

      ])

    res.status(200).json({
        status: 'Success',
        totel_result: stats.length,
        result: stats
    })
}