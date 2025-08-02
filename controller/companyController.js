const Company = require("../model/companyModel");

const getAllcompany = async (req, res) => {
  try {
    const companies = await Company.find().exec();
    res.status(200).json({
      success: true,
      data: companies,
      message: "Company retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const getCompanybyId = async (req, res) => {
  try {
    const companies = await Company.findById(req.params.companyid).exec();
    if (!companies) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Company not found"
      });
    }
    res.status(200).json({
      success: true,
      data: companies,
      message: "Company retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const addCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "companyName is required"
      });
    }

    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "Company already exists"
      });
    }

    const companies = new Company(req.body);
    const savedCompany = await companies.save();
    
    res.status(201).json({
      success: true,
      data: savedCompany,
      message: "Company created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
   
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.companyid,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCompany,
      message: "Company updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companies = await Company.findByIdAndDelete(req.params.companyid);
    
    if (!companies) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
       data: [],
      message: "Company deleted successfully"
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
 getAllcompany,
 getCompanybyId,
 addCompany,
 updateCompany,
 deleteCompany
};