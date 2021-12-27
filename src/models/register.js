const mongoose = require("mongoose");

//schema 
const participentSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    college: {
        type:String,
        required: true
    },
    phonenumber: {
        type:Number,
        required: true,
        unique: true
    },
    teamname: {
        type:String,
        trim: true,
        required: true,
        unique: true
    },
    othername: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now

    }
})

//model for registration
const Register = new mongoose.model("Register", participentSchema);

module.exports = Register;



