const mongoose = require('mongoose');


const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
       
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    
    contactNumber: {
        type: String
    },
    address: {
        type: String,
        required: true,
        trim: true,
       
    },
   
   
},{ timestamps: true});


module.exports = mongoose.model('Vendor', vendorSchema);