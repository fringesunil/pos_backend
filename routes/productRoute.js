const express = require('express')
const { getAllproduct, getProductbyId, addProduct, updateProduct, deleteProduct } = require('../controller/productController')
const { upload } = require('../middleware/multer')

const router = express.Router()


router.get('/', getAllproduct)

router.get('/:productid', getProductbyId)

router.post('/',upload.single("image"), addProduct)

router.patch('/:productid',upload.single("image"), updateProduct)

router.delete('/:productid', deleteProduct)



module.exports = router
