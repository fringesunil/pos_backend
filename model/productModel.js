const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
   name:String,
   barcode:String,
   categoryid:{
     type:mongoose.ObjectId,
         ref: "Category"
  },
   description:String,
   purchasecost:Number,
   mrp:Number,
   minimumsellingprice:Number,
   price:Number,
   tax:Number,
   stock:{
    type:Number,
    default:0
   },
   image:String
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports =Product