const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel.js')
const catchAsync = require('../utils/catchAsync.js')
const { signToken } = require('../utils/signToken.js')
const AppError = require('../utils/appError.js')

exports.signUp = async (req, res)=>{
    try{
        const newUser = await User.create(req.body)
        const token = signToken(newUser._id)
        res.status(200).json({
            status: 'Success',
            token,
            user: newUser
        }) 
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        }) 
    }
    
}
exports.login = catchAsync(async(req, res,next)=> {
    const {email, password}= req.body
    // check password
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new AppError('Incorrect email or password',401))
    }
    const checkPass = await user.correctPassword(password, user.password)
    const token = signToken(user._id)
    if( !checkPass){
        return next(new AppError('Incorrect email or password',401))
    }
    res.status(200).json({
        status: 'Success',
        token,
        user: user
    }) 
})

exports.protect = catchAsync(async(req, res, next) => {
    let token
    // 1, getting token and check
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]   
    }
    if(!token){
       return next(new AppError('You are not logged in !',404))
    }
    // 2, verify token
    let decoded
    try{
        decoded = await promisify(jwt.verify)(token, process.env.JWT)
    }
    catch(err){
        return next(new AppError('Invalid token, please sign in again',404))
    }
    

    // 3, check user still exist
    const freshUser = await User.findById(decoded.id)
    if(!freshUser){
        return next(new AppError('This user is not exists',404))
    }
    // 4, check user change password after token was issued
    if(await freshUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('please sign in again',404))
    }
    req.user = freshUser
    next()
})