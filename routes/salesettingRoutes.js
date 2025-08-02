const express = require('express')
const { getAllSaleSettings, getSaleSettingsById, addSaleSettings, updateSaleSettings, deleteSaleSettings } = require('../controller/salesettingController')
const router = express.Router()

router.get('/', getAllSaleSettings)

router.get('/:saleSettingsId', getSaleSettingsById)

router.post('/', addSaleSettings)

router.patch('/:saleSettingsId', updateSaleSettings)

router.delete('/:saleSettingsId', deleteSaleSettings)

module.exports = router 