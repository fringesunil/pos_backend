const express = require('express')
const { getAllcustomer, getCustomerbyId, addCustomer, updateCustomer, deleteCustomer } = require('../controller/customerController')

const router = express.Router()


router.get('/', getAllcustomer)

router.get('/:customerid', getCustomerbyId)

router.post('/', addCustomer)

router.patch('/:customerid', updateCustomer)

router.delete('/:customerid', deleteCustomer)



module.exports = router
