const User = require('../Models/userModel.js')
exports.getAllUser = async(req, res) => {
    try{
            const queryObj = {...req.query}
            // 1,filtering
            const excludedFields = ['page','sort','limit','fields']
            excludedFields.forEach(el => delete queryObj[el]) 

            // 2, advanced fitering (gte, gt,lte, lt)
            let queryStr = JSON.stringify(queryObj)
            // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

            let query  =  User.find(JSON.parse(queryStr))

             // 3,sorting 
            if(req.query.sort){
                query = query.sort(req.query.sort)     
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
    
            const user = await query
            res.status(200).json({
            status: 'Success',
            result: user.length,
            data:{ 
                user: user 
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
