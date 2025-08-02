const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
   name:String,
   phone:String,
   email:String,
   credit_limit:{
      type: Number,
      default:0
   },
   address:String,
   city:String,
   state:String,
   taxtype:{
    type:String,
    enum:["Registred","Unregistred"],
    default:"Unregistred"
   },
   taxno:String,
   blocked:{
      type:Boolean,
      default:false
   }
  });

  const Customer = mongoose.model('Customer', customerSchema);

  module.exports =Customer