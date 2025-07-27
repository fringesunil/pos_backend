const Customer = require("../model/customerModel");



const getAllcustomer = async (req, res) => {
  try {
    const customers = await Customer.find().exec();
    res.status(200).json({
      success: true,
      data: customers,
      message: "Customers retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const getCustomerbyId = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerid).exec();
    if (!customer) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Customer not found"
      });
    }
    res.status(200).json({
      success: true,
      data: customer,
      message: "Customer retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const addCustomer = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "Customer name is required"
      });
    }

    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    
    res.status(201).json({
      success: true,
      data: savedCustomer,
      message: "Customer created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerid,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "Customer not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCustomer,
      message: "Customer updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.customerid);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "customer not found"
      });
    }

    res.status(200).json({
      success: true,
       data: [],
      message: "customer deleted successfully"
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
 getAllcustomer,
 getCustomerbyId,
 addCustomer,
 updateCustomer,
 deleteCustomer
};