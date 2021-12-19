const mongoose = require("mongoose");

// //schema 
const submitSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    link: {
        type:String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// //model

const Projectsubmission = new mongoose.model("Projectsubmission", submitSchema);

module.exports = Projectsubmission;