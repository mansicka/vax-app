'use strict';
const source = ['./seeders/source/vaccinations.source'];
const fs = require('fs');
const readline = require('readline');
const models = require('../models')
var Order = models.Order;
var Vaccination = models.Vaccination;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    parseSourceFile(source)
      .then((data) => {
        return queryInterface.bulkInsert('Vaccinations', data)
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vaccinations', null);
  }
};

//read all source files
const parseSourceFile = async (source) => {
  return new Promise((resolve) => {
    let n = 0;
    let result = [];
    source.forEach(file => {
      readSourceFile(file)
        .then((r) => {
          result = result.concat(r);
          n++;
          if (n == source.length) {
            resolve(result);
          }
        });
    })
  })
}

//read source file line by line
const readSourceFile = async (file) => {
  return new Promise((resolve) => {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: fileStream,
    });
    let data = [];
    rl.on('line', (line) => {
      //parse & push the object to data array
      let strArray = line.split('"');
      let date = new Date().toISOString().slice(0, -1);

      //Mysql has a known bug when inserting datetime with trailing z's so cut those off ;P
      let dateNoZ = strArray[15].toString().slice(0, -1);

      let vaccinationObject = {
        id: strArray[3],
        gender: strArray[11],
        date: dateNoZ,
        Orderid: strArray[7],
        createdAt: date,
        updatedAt: date,
      }
      data.push(vaccinationObject);
    });

    fileStream.on('end', () => {
      resolve(data);
    }
    )
  });

};

const findAllVaccinationsByOriginOrderId = (id) => {
  return Vaccination.count({
    where: {
      origin_id: id
    }
  })
    .then((count) => {
      return count
    });
}