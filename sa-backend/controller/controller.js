const db = require("../database");
const vaccination = require("../model/vaccination");
const Vaccination = db.vaccinations;
const Order = db.orders;
const makeId = require('../util/makeid')

exports.createVaccination = (origin_bottle, vaccination) => {
    generatedId = makeId();
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
    generatedId = makeId();
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
        console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
      })
      .catch((err) => {
        console.log(">> Error while creating tutorial: ", err);
      });
  };

  exports.importVaccination = (vaccination) => {

    return Vaccination.create({
        id: vaccination.id,
        gender: vaccination.gender,
        date: vaccination.date,
        origin_bottle: origin_bottle
    })
    .then((vaccination) => {
        console.log(process.env.npm_package_name + ' : vaccination IMPORTED: id: ' +
         vaccination.id + ' / origin bottle: ' + vaccination.origin_bottle);
         return vaccination;
    })
    .catch((e) => {
        console.log(process.env.npm_package_name + ' : error when IMPORTING vaccine: ' + e);
    });

};

exports.importOrder = (order) => {

    return Order.create({
      order_id: generatedId,
      responsible_person: order.responsible_person,
      district: order.district,
      vaccine_brand: order.vaccine_brand,
      injections: order.injections,
      arrival_date: order.arrival_date
    })
      .then((tutorial) => {
        console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
      })
      .catch((err) => {
        console.log(">> Error while creating tutorial: ", err);
      });
  };
