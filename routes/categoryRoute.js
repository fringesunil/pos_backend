const express = require('express')
const { getAllcategory, getCategorybyId, addCategory, updateCategory, deleteCategory } = require('../controller/categoryController')
const router = express.Router()


router.get('/', getAllcategory)

router.get('/:categoryid', getCategorybyId)

router.post('/', addCategory)

router.patch('/:categoryid', updateCategory)

router.delete('/:categoryid', deleteCategory)



module.exports = router
