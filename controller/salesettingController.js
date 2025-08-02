const SaleSettings = require("../model/salesettingModel");


const getAllSaleSettings = async (req, res) => {
  try {
    const saleSettings = await SaleSettings.find().exec();
    res.status(200).json({
      success: true,
      data: saleSettings,
      message: "Sale settings retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const getSaleSettingsById = async (req, res) => {
  try {
    const saleSettings = await SaleSettings.findById(req.params.saleSettingsId).exec();
    if (!saleSettings) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Sale settings not found"
      });
    }
    res.status(200).json({
      success: true,
      data: saleSettings,
      message: "Sale settings retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const addSaleSettings = async (req, res) => {
  try {
    const { priceedit, inclusivetax, notax, displaystock, stockvalidation } = req.body;
    
    // Validate that all fields are boolean
    const booleanFields = ['priceedit', 'inclusivetax', 'notax', 'displaystock', 'stockvalidation'];
    for (const field of booleanFields) {
      if (req.body[field] !== undefined && typeof req.body[field] !== 'boolean') {
        return res.status(400).json({
          success: false,
          data: [],
          message: `${field} must be a boolean value`
        });
      }
    }

    const saleSettings = new SaleSettings(req.body);
    const savedSaleSettings = await saleSettings.save();
    
    res.status(201).json({
      success: true,
      data: savedSaleSettings,
      message: "Sale settings created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const updateSaleSettings = async (req, res) => {
  try {
    const { priceedit, inclusivetax, notax, displaystock, stockvalidation } = req.body;
    
    // Validate that all fields are boolean
    const booleanFields = ['priceedit', 'inclusivetax', 'notax', 'displaystock', 'stockvalidation'];
    for (const field of booleanFields) {
      if (req.body[field] !== undefined && typeof req.body[field] !== 'boolean') {
        return res.status(400).json({
          success: false,
          data: [],
          message: `${field} must be a boolean value`
        });
      }
    }

    const updatedSaleSettings = await SaleSettings.findByIdAndUpdate(
      req.params.saleSettingsId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSaleSettings) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Sale settings not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedSaleSettings,
      message: "Sale settings updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const deleteSaleSettings = async (req, res) => {
  try {
    const saleSettings = await SaleSettings.findByIdAndDelete(req.params.saleSettingsId);
    
    if (!saleSettings) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Sale settings not found"
      });
    }

    res.status(200).json({
      success: true,
      data: [],
      message: "Sale settings deleted successfully"
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
  getAllSaleSettings,
  getSaleSettingsById,
  addSaleSettings,
  updateSaleSettings,
  deleteSaleSettings
}; 