const express = require('express');
const { 
    addUser, 
    updateUser, 
    deleteUser,
    getAlluser,
    getUserbyid,
} = require('../controller/userController');

const router = express.Router();

router.get('/', getAlluser);

router.get('/:userid', getUserbyid);

router.post('/', addUser);

router.patch('/:userid', updateUser);

router.delete('/:userid', deleteUser);


module.exports = router; 