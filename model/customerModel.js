const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
   name:String,
   phone:String,
   email:String,
   credit_limit:Number,
   address:String,
   city:String,
   state:String,
   taxtype:{
    type:String,
    enum:["Registred","Unregistred"],
    default:"Unregistred"
   },
   taxno:String,
   blocked:Boolean
  });

  const Customer = mongoose.model('Customer', customerSchema);

  module.exports =Customer