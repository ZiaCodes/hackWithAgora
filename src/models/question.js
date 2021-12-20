const mongoose = require("mongoose");

//schema 
const questionSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
    },
    
    msg: {
        type:String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now

    }
})

//model for registration
const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;



