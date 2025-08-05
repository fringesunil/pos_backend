const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
     
    },
    address: {
        type: String,
        required: true,
      
    },
    state: {
        type: String,
        required: true,
       
    },
    country: {
        type: String,
        required: true,
        
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    gstNo: {
        type: String,
        trim: true,
        default:""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema); 