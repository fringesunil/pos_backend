const Branch = require("../model/branchModel");



const getAllbranch = async (req, res) => {
  try {
    const branches = await Branch.find().exec();
    res.status(200).json({
      success: true,
      data: branches,
      message: "branches retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const getbranchbyId = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchid).exec();
    if (!branch) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "branch not found"
      });
    }
    res.status(200).json({
      success: true,
      data: branch,
      message: "branch retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const addbranch = async (req, res) => {
  try {
    const { branchName } = req.body;
    if (!branchName) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "branch name is required"
      });
    }

    const existingbranch = await Branch.findOne({ branchName });
    if (existingbranch) {
      return res.status(400).json({
        success: false,
         data: [],
        message: "branch already exists"
      });
    }

    const branch = new branch(req.body);
    const savedbranch = await branch.save();
    
    res.status(201).json({
      success: true,
      data: savedbranch,
      message: "branch created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const updatebranch = async (req, res) => {
  try {
    const { branchName } = req.body;
    if (branchName) {
      const existingbranch = await Branch.findOne({ 
        branchName, 
        _id: { $ne: req.params.branchid } 
      });
      if (existingbranch) {
        return res.status(400).json({
          success: false,
           data: [],
          message: "branch name already exists"
        });
      }
    }

    const updatedbranch = await Branch.findByIdAndUpdate(
      req.params.branchid,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedbranch) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "branch not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedbranch,
      message: "branch updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
       data: [],
      message: error.message,
    });
  }
};

const deletebranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.branchid);
    
    if (!branch) {
      return res.status(404).json({
        success: false,
         data: [],
        message: "branch not found"
      });
    }

    res.status(200).json({
      success: true,
       data: [],
      message: "branch deleted successfully"
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
 getAllbranch,
 getbranchbyId,
 addbranch,
 updatebranch,
 deletebranch
};