const models = require('../models')
var Order = models.Order;
var Vaccination = models.Vaccination;

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Vaccination,
                    as: 'vaccinations'
                }
            ]
        });
        return res.status(200).json({ orders });
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
                        model: Vaccination
                    }
                ]
            });
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersByDistrict = async (req, res) => {
    try {
        const district = req.params.id;
        const orders = await Order.findOne(
            {
                where: { district: district }
            });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getOrdersByRecipent = async (req, res) => {
    try {
        const recipent = req.params.id;
        const orders = await Order.findAll(
            {
                where: { responsible_person: recipent },
                include: [
                    {
                        model: Vaccination
                    }
                ]
            });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const findAllVaccinationsByOriginOrderId = (id) => {
    return Vaccination.count({
        where: {
            orderId: id
        }
    })
        .then((count) => {
            return count
        });
}