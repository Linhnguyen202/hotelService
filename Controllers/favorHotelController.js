const FavorHotel = require('../Models/favorHotelModel.js')

exports.addFavorHotel = async (req,res) => {
   
    try {
        const favorHotel = await FavorHotel.create(req.body)
        res.status(200).json({
            status: 'success',
            favor: favorHotel
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}
exports.removeFavorHotel = async (req, res) => {
    try {
        const favorHotel = await FavorHotel.findOneAndDelete({hotel : req.params.id})
        res.status(200).json({
            status: 'success',
            message: 'Delete successful'
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}
exports.checkFavorExist = async (req, res) => {
    try {
        const favorHotel = await FavorHotel.findOne({hotel : req.params.id, user: req.params.userId})
        if(favorHotel === null){
            res.status(200).json({
                status: 'success',
                message: 0
            })
        }
        else{
            res.status(200).json({
                status: 'success',
                message: 1
            })
        }
        
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}
exports.getAllFavor = async (req, res)=>{
    try{
        const queryObj = {...req.query}
        // 1,filtering
        const excludedFields = ['page','sort','limit','fields']
        excludedFields.forEach(el => delete queryObj[el]) 

        // 2, advanced fitering (gte, gt,lte, lt)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        let query  =  FavorHotel.find({user: req.params.userId}).find(JSON.parse(queryStr)).populate('hotel')

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

        const favorHotel = await query

        res.status(200).json({
        status: 'Success',
        total_result: favorHotel.length,
        favor: favorHotel 
        
    })
}
catch(err){
    res.status(404).json({
        status: 'failed',
        message: err
    })
}
}