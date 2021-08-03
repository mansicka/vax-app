const { Router } = require('express');
const OrderController = require('../controllers/order.controller')
const VaccinationController = require('../controllers/vaccination.controller')
const router = Router();


router.get('/', (req, res) => res.send('See readme.md for usage :)'))


//Vaccination routes
router.get('/vaccination/all', VaccinationController.getAllVaccinations);
router.get('/vaccination/:id', VaccinationController.getVaccinationById);
router.get('/vaccination/order/:id', VaccinationController.getVaccinationByOrderId);

//Order routes
router.get('/order/all', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrderByOrderId);
router.get('/order/district/:id', OrderController.getOrdersByDistrict);
router.get('/order/recipent', OrderController.getOrdersByRecipent);



module.exports = router