const express = require('express')
const { getAllcompany, getCompanybyId, addCompany, updateCompany, deleteCompany } = require('../controller/companyController')
const router = express.Router()


router.get('/', getAllcompany)

router.get('/:companyid', getCompanybyId)

router.post('/', addCompany)

router.patch('/:companyid', updateCompany)

router.delete('/:companyid', deleteCompany)



module.exports = router
