const db = require("../database");
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
        origin_bottle: origin_bottle
    })
    .then((vaccination) => {
        console.log(process.env.npm_package_name + ' : vaccination added: id: ' +
         vaccination.id + ' / origin bottle: ' + vaccination.origin_bottle);
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

  exports.importVaccination = (vaccination) => {

    return Vaccination.create({
        id: vaccination.id,
        gender: vaccination.gender,
        date: vaccination.date,
        order_id: vaccination.order_id
    })
    .then((vaccination) => {
        console.log(process.env.npm_package_name + ' : vaccination imported: id: ' +
         vaccination.id);
         return vaccination;
    })
    .catch((e) => {
        console.log(process.env.npm_package_name + ' : error when importing vaccine: ' + e);
    });

};

exports.importOrder = (order) => {

    return Order.create({
      order_id: order.order_id,
      order_number: order.order_number,
      responsible_person: order.responsible_person,
      district: order.district,
      vaccine_brand: order.vaccine_brand,
      injections: order.injections,
      arrival_date: order.arrival_date
    })
      .then((tutorial) => {
        console.log(process.env.npm_package_name + ' : order imported : id: ' +
        order.order_id);
        return tutorial;
      })
      .catch((err) => {
        console.log(process.env.npm_package_name + ' : error when importing order: ' + err);
      });
  };
