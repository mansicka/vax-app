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
        const zerpfy = await Order.count(
            {
                where: {
                    vaccine_brand: 'Zerpfy'
                }, include: [
                    {
                        model: Vaccination,
                        as: 'vaccinations'
                    }
                ]
            }
        );
        const solarBuddhica = await Order.count(
            {
                where: {
                    vaccine_brand: 'SolarBuddhica'
                }, include: [
                    {
                        model: Vaccination,
                        as: 'vaccinations'
                    }
                ]
            }
        );
        const antiqua = await Order.count(
            {
                where: {
                    vaccine_brand: 'Antiqua'
                }, include: [
                    {
                        model: Vaccination,
                        as: 'vaccinations'
                    }
                ]
            }
        );
        const orders = { 'Zerpfy': zerpfy, 'SolarBuddhica': solarBuddhica, 'Antiqua': antiqua };
        return res.status(200).json(orders);
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