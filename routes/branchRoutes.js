const express = require('express')
const { getAllbranch, getbranchbyId, addbranch, updatebranch, deletebranch } = require('../controller/branchController')

const router = express.Router()


router.get('/', getAllbranch)

router.get('/:branchid', getbranchbyId)

router.post('/', addbranch)

router.patch('/:branchid', updatebranch)

router.delete('/:branchid', deletebranch)



module.exports = router
