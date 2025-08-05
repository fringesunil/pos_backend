const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
   email:String,
   password:String,
   role:{
      type:String,
      default:"Superadmin"
   }
  });

  const Admin = mongoose.model('Admin', adminSchema);

  module.exports =Admin