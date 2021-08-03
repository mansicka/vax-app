const models = require('../models')
var Order = models.Order;
var Vaccination = models.Vaccination;

exports.getAllVaccinations = async (req, res) => {
    try {
        const vaccinations = await Vaccination.findAll({
            include: [
                {
                    model: Order,
                    as: 'order'
                }
            ]
        });
        return res.status(200).json({ vaccinations });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


exports.getVaccinationByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        const vaccination = await Vaccination.findOne(
            {
                where: { OrderId: orderId },
                include: [
                    {
                        model: Order,
                        as: 'order'
                    }
                ]
            });
        return res.status(200).json({ vaccination });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getVaccinationById = async (req, res) => {
    try {
        const vaccId = req.params.id;
        const vaccination = await Vaccination.findOne(
            {
                where: { id: vaccId },
                include: [
                    {
                        model: Order,
                        as: 'order'
                    }
                ]
            });
        return res.status(200).json({ vaccination });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}