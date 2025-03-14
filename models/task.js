const mongoose = require("mongoose")
const Schema = mongoose.Schema
const taskSchema = new Schema({
    id : {
        type : Number,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    })

const Task = mongoose.model("Task", taskSchema) //Mongoose automatically pluralizes the model name ("Task") to determine the collection name.

module.exports = Task
