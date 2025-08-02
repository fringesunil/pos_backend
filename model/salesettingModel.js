const mongoose = require('mongoose');

const saleSettingsSchema = new mongoose.Schema({
  priceedit: {
    type: Boolean,
    default: false
  },
  inclusivetax: {
    type: Boolean,
    default: false
  },
  notax: {
    type: Boolean,
    default: false
  },
  displaystock: {
    type: Boolean,
    default: false
  },
  stockvalidation: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const SaleSettings = mongoose.model('SaleSettings', saleSettingsSchema);

module.exports = SaleSettings; 