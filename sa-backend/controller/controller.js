const { vaccinations } = require("../models/database");
const db = require("../models/database");
const Vaccination = db.vaccinations;
const Order = db.orders;
const makeId = require('../util/makeid');


exports.createVaccination = (origin_bottle, vaccination) => {
  generatedId = makeId.getNewId;
  isoDate = (new Date()).toISOString();

  return Vaccination.create({
    id: generatedId,
    gender: vaccination.gender,
    date: isoDate,
    origin_id: vaccination.origin_id
  })
    .then((vaccination) => {
      console.log(process.env.npm_package_name + ' : vaccination added: id: ' +
        vaccination.id + ' / origin bottle: ' + vaccination.origin_id);
      return vaccination;
    })
    .catch((e) => {
      console.log(process.env.npm_package_name + ' : error when creating vaccine: ' + e);
    });

};

exports.createOrder = (order) => {
  generatedId = makeId.getNewId;
  isoDate = (new Date()).toISOString();
  return Order.create({
    order_id: generatedId,
    responsible_person: order.responsible_person,
    district: order.district,
    vaccine_brand: order.vaccine_brand,
    injections: order.injections,
    arrival_date: isoDate

  })
    .then((tutorial) => {
      console.log(process.env.npm_package_name + ' : order added: id: ' +
        order.order_id);
      return tutorial;
    })
    .catch((err) => {
      console.log(process.env.npm_package_name + ' : error when adding order: ' + e);
    });
};

//import vaccination (for initial data import);
exports.importVaccination = (vaccination) => {
  return Vaccination.create({
    id: vaccination.id,
    gender: vaccination.gender,
    date: vaccination.date,
    origin_id: vaccination.origin_id
  })
    .then((vaccination) => {
      console.log('vaccination imported: id: ' +
        vaccination.id);
      return vaccination;
    })
    .catch((e) => {
      console.log('error when importing vaccine: ' + e);
    });

};
//import order (for initial data import)
exports.importOrder = (order) => {

  return Order.create({
    order_id: order.order_id,
    order_number: order.order_number,
    responsible_person: order.responsible_person,
    district: order.district,
    vaccine_brand: order.vaccine_brand,
    injections: order.injections,
    arrival_date: order.arrival_date,
    injections_left: order.injections_left
  })
    .then((order) => {
      console.log('order imported : id: ' +
        order.order_id);
      return order;
    })
    .catch((err) => {
      console.log('error when importing order: ' + err);
    });
};


//get a number of vaccinations associated with given order_id
exports.findAllVaccinationsByOriginOrderId = (order_id) => {
  return Vaccination.count({
    where: {
      origin_id: order_id
    }
  })
    .then((count) => {
      return count
    });
}


//**requests**//

//find vaccinations for order id
exports.getVaccinationsForOrderid = (req, res) => {
  const orderid = req.params.orderid;

  Vaccination.findAll({
    where: {
      origin_id: orderid
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

//find orders by district
exports.getOrdersByDistrict = (req, res) => {
  const district = req.params.district;

  Order.findAll({
    where: {
      district: district
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.getOrdersByRecipent = (req, res) => {
  const recipent = req.params.recipent;

  Order.findAll({
    where: {
      received_by: recipent
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.getSingleVaccination = (req, res) => {
  const vaccinationId = req.params.vaccinationId;

  Vaccination.findByPk(vaccinationId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.getAllOrders = (req, res) => {
  Order.findAll({ raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
}

exports.getAllVaccinations = (req, res) => {

  //TODO !! OMA QUERY
  Vaccination.findAll({})
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
}

exports.getSingleOrder = (req, res) => {
  const order = req.params.order;

  Order.findByPk(orderid)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};