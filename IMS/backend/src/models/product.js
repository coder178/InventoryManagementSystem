const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  
    },
    
    price: {
        type: Number,
        required: true
    },
    InitialQuantity:{
        type: Number,
        requires: true
    },
    CurrentQuantity:{
        type: Number,
        requires: true
    },
    
    removedItems: [Number],
    resellItems: [Number],
    MaintenanceItems: [Number],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref:'Category', required:true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId, ref:'Location', required:true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId, ref:'Vendor', required:true
    },
    
    updatedAt: Date,

   
},{ timestamps: true});


module.exports = mongoose.model('Product', productSchema);