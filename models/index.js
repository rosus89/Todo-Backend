const mongoose = require("mongoose")

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://server-1:27017", {
    keepAlive: true
})
.then(()=>{
    console.log("Database connected successfully.")
})
.catch((err)=>{
    console.log("Database connection failed.")
    console.log(err)
})

module.exports.Todo = require("./todo");