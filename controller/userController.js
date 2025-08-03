const User = require('../model/userModel');
const Branch = require('../model/branchModel');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .populate('branch', 'branchName address')
            .select('-password'); // Exclude password from response
        
        res.status(200).json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid)
            .populate('branch', 'branchName address state country')
            .select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};



// Create new user
const addUser = async (req, res) => {
    try {
        const { name, email, password, phone, role, branch, permissions } = req.body;
        
        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        
        // Verify branch exists
        const branchExists = await Branch.findById(branch);
        if (!branchExists) {
            return res.status(400).json({
                success: false,
                message: 'Branch not found'
            });
        }
        
        // Create user object
        const userData = {
            name,
            email,
            password, // In production, hash this password
            phone,
            role: role || 'staff',
            branch,
            permissions: permissions || {}
        };
        
        const user = await User.create(userData);
        
        // Return user without password
        const userResponse = await User.findById(user._id)
            .populate('branch', 'branchName address')
            .select('-password');
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const updateData = req.body;
        
        // Check if user exists
        const existingUser = await User.findById(userid);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // If email is being updated, check for duplicates
        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await User.findOne({ email: updateData.email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
        }
        
      
        if (updateData.branch) {
            const branchExists = await Branch.findById(updateData.branch);
            if (!branchExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Branch not found'
                });
            }
        }
        
        if (!updateData.password) {
            delete updateData.password;
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            updateData,
            { new: true, runValidators: true }
        )
        .populate('branch', 'branchName address')
        .select('-password');
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;
        
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        await User.findByIdAndDelete(userid);
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
}; 