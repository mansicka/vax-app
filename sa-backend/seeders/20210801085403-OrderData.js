'use strict';
const source = ['./seeders/source/SolarBuddhica.source', './seeders/source/Antiqua.source', './seeders/source/Zerpfy.source'];
const fs = require('fs');
const readline = require('readline');
const data = [];


module.exports = {
  up: async (queryInterface, Sequelize) => {
    parseSourceFile(source)
      .then((data) => {
        return queryInterface.bulkInsert('Orders', data)
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null);
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
      let dateNoZ = strArray[23].toString().slice(0, -1);

      //Mysql has a known bug when inserting datetime with trailing z's so cut those off ;P
      let date = new Date().toISOString().slice(0, -1);
      //
      let orderObject = {
        id: strArray[3],
        order_number: strArray[6].slice(1, -1),
        responsible_person: strArray[9],
        district: strArray[13],
        vaccine_brand: strArray[17],
        injections: strArray[20].slice(1, -1),
        arrival_date: dateNoZ,
        createdAt: date,
        updatedAt: date,
        injections_left: strArray[20].slice(1, -1),
      }

      data.push(orderObject);
    });

    fileStream.on('end', () => {
      resolve(data);
    }
    )
  });

};

