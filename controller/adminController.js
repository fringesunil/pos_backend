const Admin = require("../model/adminModel");



const getAlladmin = async (req, res) => {
  try {
    const admins = await Admin.find().exec();
    res.status(200).json({
      success: true,
      data: admins,
      message: "Admin retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const getAdminbyId = async (req, res) => {
  try {
    const Admins = await Admin.findById(req.params.adminid).exec();
    if (!Admins) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Admin not found"
      });
    }
    res.status(200).json({
      success: true,
      data: Admins,
      message: "Admin retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name } = req.body;
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "User name already exists"
      });
    }

    const Admins = new Admin(req.body);
    const savedAdmins = await Admins.save();
    
    res.status(201).json({
      success: true,
      data: savedAdmins,
      message: "Admin created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.adminid,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Admin updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admins = await Admin.findByIdAndDelete(req.params.adminid);
    
    if (!admins) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
       data: [],
      message: "Category deleted successfully"
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
 getAlladmin,
 getAdminbyId,
 addAdmin,
 updateAdmin,
 deleteAdmin
};