const Product = require("../model/productModel");



const getAllproduct = async (req, res) => {
  try {
    const Products = await Product.find().exec();
    res.status(200).json({
      success: true,
      data: Products,
      message: "Categories retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const Products = await Product.findById(req.params.productid).exec();
    if (!Products) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      data: Products,
      message: "Product retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
 try{
     let imageUrl;
  if(req.file){
    imageUrl=await imageUpload(req.file.path);
 }
    const data = req.body
    const products = new Product({...data,
      image:imageUrl
    })
    await products.save();
     res.status(200).json({
      success: true,
      data: products,
      message: "Product added successfully"
    });
 }catch(error){
     res.status(500).json({
      success: false,
      data: [],
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try{
    if(req.file){
    let imageUrl=await imageUpload(req.file.path);
     req.body.image=imageUrl;
 }
   const updateproducts = await Product.findByIdAndUpdate(req.params.productid, req.body, {new:true})
    res.status(200).json({
      success: true,
      data: updateproducts,
      message: "Product updated successfully"
    });
  }catch(error){
     res.status(500).json({
      success: false,
      data: [],
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.productid);
    
    if (!products) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
       data: [],
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
        data: [],
      message: error.message,
    });
  }
};

module.exports = {
 getAllproduct,
 getProductbyId,
 addProduct,
 updateProduct,
 deleteProduct
};