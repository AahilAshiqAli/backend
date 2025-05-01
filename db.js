const mongoose = require("mongoose")
require("dotenv").config();


// We want to handle reconnect connection so if connection with database breaks then we will handle it.
let isConnectedBefore =false
const connectDBwithRetry = async () => {

    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
    }).then(() => {
      isConnectedBefore = true;
      console.log("Hello There.........")
    }).catch( (error) => {
      // this catch block is so we can create a recursion The function re-runs after 5 seconds, trying to connect again.
    console.error("Database connection faced error ", error.message);
    if(!isConnectedBefore){
      setTimeout(connectDBwithRetry, 5000);
    } })
}

// This is basically an event listener for knowing when connection closes...
// .connection.on is basically used when connection was open before. Calls connectDBwithRetry only once.
mongoose.connection.on("disconnected", () => {
  console.log("Connection disconnected. Retrying to connect .......")
  connectDBwithRetry();
})

mongoose.connection.on("error", (err) => {
  console.log("Connection Error. Retrying to connect ......" , err.message)
})

connectDBwithRetry();

module.exports = mongoose 
// defualt exporting mongoose
// We are exporting mongoose so single DBinstance rather than different DB instances
// The first time we would import this file, initial conectDBwithRetry would runa nd create a mongoDB connection


