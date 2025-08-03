const express = require('express');
const { 
    getAllUsers, 
    getUserById, 
    addUser, 
    updateUser, 
    deleteUser,
} = require('../controller/userController');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:userid', getUserById);

router.post('/', addUser);

router.patch('/:userid', updateUser);

router.delete('/:userid', deleteUser);


module.exports = router; 