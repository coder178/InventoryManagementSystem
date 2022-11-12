const mongoose = require('mongoose');


const maintenanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  
    },
    quantityunderMaintenance:{
        type:Number
    },
    quantitydelievered:{
        type:Number
    },
    itemid: {
        type: mongoose.Schema.Types.ObjectId, ref:'Product', required:true,
        required: true,
    },
    maintenanceNos: [Number],
    agency: {
        type: mongoose.Schema.Types.ObjectId, ref:'Agency', required:true,
        required: true,
    },
    dateAdded:{
        type:Date,
        required: true,
    },
    dateReceived:{
        type:Date,
        
    },
    status: {
        type: String,
        required: true,
    },
    cost:{
        type:Number
    },
    
    updatedAt: Date,

   
},{ timestamps: true});


module.exports = mongoose.model('Maintenance', maintenanceSchema);