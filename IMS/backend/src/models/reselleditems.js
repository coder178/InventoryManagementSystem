const mongoose = require('mongoose');


const reselledproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  
    },
    
    itemid: {
        type: mongoose.Schema.Types.ObjectId, ref:'Product', required:true
    },
    quantity:{
        type: Number,
        requires: true
    },
    price:{
        type: Number,
        requires: true
    },
    dateReselled:{
        type:Date,
        required: true,
    },
    reselledNos: [Number],
    customername: {
        type: String,
        required: true,
      
       
    },
    customeremail: {
        type: String,
       
        lowercase: true
    },
    
    customercontactNumber: {
        type: String
    },
    customeraddress: {
        type: String,
        required: true,
        trim: true,
       
    },
    updatedAt: Date,

   
},{ timestamps: true});


module.exports = mongoose.model('ReselledProduct', reselledproductSchema);