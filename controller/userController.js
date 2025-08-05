const User= require('../model/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAlluser = async (req, res) => {
    const user= await User.find().exec();
    const response = user.map(user => ({
        _id: user._id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role:user.role,
      branch:user.branch,
      isActive:user.isActive

    }));
     res.status(200).json({
      success: true,
      data: response,
      message: "User retrieved successfully"
    });

  }

const getUserbyid=async (req, res) => {
    const user= await User.findById(req.params.userid).exec();
   const response = user.map(user => ({
        _id: user._id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role:user.role,
      branch:user.branch,
      isActive:user.isActive

    }));
     res.status(200).json({
      success: true,
      data: response,
      message: "User retrieved successfully"
    });
  }
  
  const addUser = async (req, res) => {
    try {
      const { email, password, ...data } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
     
      const hash = bcrypt.hashSync(password, saltRounds);
      
      const user = new User({
        ...data,
        email, 
        password: hash,
      });
      await user.save();
     const response = user.map(user => ({
        _id: user._id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role:user.role,
      branch:user.branch,
      isActive:user.isActive

    }));
     res.status(200).json({
      success: true,
      data: response,
      message: "User added successfully"
    });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
 
 const updateUser = async (req, res) => {
    const updateuser = await User.findByIdAndUpdate(req.params.userid, req.body, {new:true})
   const response = user.map(user => ({
        _id: user._id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role:user.role,
      branch:user.branch,
      isActive:user.isActive

    }));
     res.status(200).json({
      success: true,
      data: response,
      message: "User updated successfully"
    });
  }
  
 const deleteUser = async (req, res) => {
    await  User.findByIdAndDelete(req.params.userid)
    res.send('Delete Successfully')
  }


  module.exports={
    getAlluser,
    getUserbyid,
    addUser,
    updateUser,
    deleteUser
  }