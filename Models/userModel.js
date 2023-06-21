const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt= require('bcryptjs')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: validator.isEmail
    },
    img: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    passwordChangeAt: {
        type: Date
    }
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter = async function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changedTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimeStamp
    }
    return false
}
const User = mongoose.model('users', userSchema)
module.exports = User