const { Router } = require('express');
const OrderController = require('../controllers/order.controller')
const VaccinationController = require('../controllers/vaccination.controller')
const router = Router();


router.get('/', (req, res) => res.send('See readme.md for usage :)'))


//Vaccination routes
router.get('/vaccination/all', VaccinationController.getAllVaccinations);
router.get('/vaccination/id/:id', VaccinationController.getVaccinationById);
router.get('/vaccination/orderid/:id', VaccinationController.getVaccinationByOrderId);
router.get('/vaccination/dates', VaccinationController.getCountVaccinationsByDate);
//Order routes
router.get('/order/all', OrderController.getAllOrders);
router.get('/order/id/:id', OrderController.getOrderByOrderId);
router.get('/order/district/:id', OrderController.getOrdersByDistrict);
router.get('/order/recipent', OrderController.getOrdersByRecipent);
router.get('/order/goingbad/:date', OrderController.getOrdersGoingBad);
router.get('/order/brands', OrderController.getOrderAmountsPerBrand);
router.get('/order/count', OrderController.getCountAllOrders);
router.get('/order/dates', OrderController.getCountOrdersByDate);
router.get('order/gonebad/:date', OrderController.getOrdersExpiredForDate);

module.exports = router