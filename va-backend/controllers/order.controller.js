const models = require('../models')
const { Op, Sequelize } = require('sequelize')
var Order = models.Order;
var Vaccination = models.Vaccination;

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


exports.getOrderByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne(
            {
                where: { id: orderId },
                include: [
                    {
                        model: Vaccination,
                        as: 'vaccinations'
                    }
                ]
            });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersByDistrict = async (req, res) => {
    try {
        const district = req.params.id;
        const orders = await Order.findAll(
            {
                where: { district: district }
            });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersByRecipent = async (req, res) => {
    try {
        const recipent = req.params.id;
        const orders = await Order.findAll(
            {
                where: { responsible_person: recipent }
            });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersGoingBad = async (req, res) => {
    try {
        console.log(req.params.date)
        const startDate = new Date(req.params.date);
        const endDate = new Date(req.params.date);
        endDate.setDate(endDate.getDate() + 30);
        const orders = await Order.findAll(
            {
                where: {
                    arrival_date: { [Op.between]: [startDate, endDate] }
                }
            });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrderAmountsPerBrand = async (req, res) => {

    try {
        const orders = await Order.findAll();
        let zerpfy = 0;
        let solarb = 0;
        let antiqua = 0
        let results = [];
        orders.forEach(order => {
            if (order.vaccine_brand == 'Zerpfy') { zerpfy++ }
            if (order.vaccine_brand == 'SolarBuddhica') { solarb++ }
            if (order.vaccine_brand == 'Antiqua') { antiqua++ }
        });
        results.push({ 'Zerpfy': zerpfy, 'SolarBuddhica': solarb, 'Antiqua': antiqua })
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getCountAllOrders = async (req, res) => {
    try {
        const orders = await Order.count()
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getCountOrdersByDate = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: ['arrival_date']
        });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersExpiredForDate = async (req, res) => {

    const threshold = new Date(req.params.date);
    threshold.setDate(threshold.getDate() + 30);
    try {
        const orders = await Order.findAll({
            where: {
                arrival_date: {
                    [Op.lt]: threshold
                },
            }
        })
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}