const express  = require('express');
const Vendor = require('../models/vendor')
const router = express.Router();

const { getVendors, updateVendorByName } = require('../controllers/vendor');
const { requireSignin } = require('../common-middleware');
const { addVendor } = require('../controllers/vendor');

router.post('/vendor/create', requireSignin, addVendor);

router.get('/vendor/getvendor', getVendors);

router.post('/vendor/updatevendor',updateVendorByName);

module.exports = router;