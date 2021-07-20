module.exports = app => {
    const controller = require(".././controller/controller.js");


    var router = require("express").Router();


    // get all orders
    router.get("/order/all", controller.getAllOrders);

    // get single order by id
    router.get("/order/:orderid", controller.getSingleOrder);

    // get orders by district
    router.get("/order/district/:district", controller.getOrdersByDistrict);

    // get vaccinations for order id
    router.get("/order/vaccination/:orderid", controller.getVaccinationsForOrderid);


    // get single vaccination by id
    router.get("/vaccination/:vaccinationId", controller.getSingleVaccination)

    // get all vaccinations
    router.get("/vaccination/all", controller.getAllVaccinations)


    app.use('/api/', router);
};