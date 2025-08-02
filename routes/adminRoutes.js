const express = require('express')
const { getAlladmin, getAdminbyId, addAdmin, updateAdmin, deleteAdmin } = require('../controller/adminController')
const router = express.Router()


router.get('/', getAlladmin)

router.get('/:adminid', getAdminbyId)

router.post('/', addAdmin)

router.patch('/:adminid', updateAdmin)

router.delete('/:adminid', deleteAdmin)



module.exports = router
