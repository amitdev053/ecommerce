
const mongoose = require("mongoose")

// const URI = "mongodb://127.0.0.1:27017/user_test"
// mongoose.connect()

const URI = process.env.MONGODB_URI

const connectDb = async () =>{
    try{

        await mongoose.connect(URI)
        console.log("Connect successfully connected to the database")

    }catch(error){
        console.log("Connection falied to the database")
        process.exit(0)
    }
}

module.exports = connectDb