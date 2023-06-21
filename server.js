const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require("./app.js");
const mongoose = require('mongoose')
const DB = process.env.DATABASE

// connect db
mongoose.connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successful")
})

// starting server
const PORT = 3000;
app.listen(PORT,()=>{
    console.log('server is running')
})