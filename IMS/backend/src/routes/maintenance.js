const express  = require('express');
const router = express.Router();

const { requireSignin} = require('../common-middleware');
const { addToMaintenance, updateMaintenance, getMaintenanceList, getrecentMaintenanceList,getMaintenanceProducts, getMaintenanceListByName ,getTotalMaintenance, getMonthsMaintenance} = require('../controllers/maintenance');



router.post('/maintenance/add', requireSignin, addToMaintenance);
router.post('/maintenance/update',   requireSignin, updateMaintenance);
router.get('/maintenance/getmaintenanceList', getMaintenanceList);
router.get('/maintenance/getrecentmaintenanceList', getrecentMaintenanceList);
router.post('/maintenance/getmaintenancelistbyname', getMaintenanceListByName);
router.get('/maintenance/getmaintenanceitems', getMaintenanceProducts);
router.get('/maintenance/getTotalmaintenance', getTotalMaintenance);
router.get('/maintenance/getMonthsmaintenance', getMonthsMaintenance);


module.exports = router;