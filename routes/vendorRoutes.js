const vendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:harshi', vendorController.getVendorById)

module.exports = router;
//export that bcoz all router modules are export

//IMPORTANT here API iscreated with POST method...so which we using post method they dont haveto test in browser 
//so use postman software //1)open in firefox
//2)seleect post method
//3)in app, locahost:4000/vendor/register
//4)vendor means defining path in app.use('/vendor',vendorRoutes)

//5)now endpoint is register in vendorroutes----
// router.post('/register',vendorController.vendorRegister);



