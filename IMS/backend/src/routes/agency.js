const express  = require('express');
const Agency = require('../models/agency')
const router = express.Router();
const { requireSignin } = require('../common-middleware');
const { addAgency, getAgencies, updateAgencyByName } = require('../controllers/agency');


router.post('/agency/create', requireSignin, addAgency);

router.get('/agency/getagency', getAgencies);

router.post('/agency/updateagency',updateAgencyByName);

module.exports = router;