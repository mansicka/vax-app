'use strict';
const source = ['./source/SolarBuddhica.source', './source/Antiqua.source', './source/Zerpfy.source'];
const fs = require('fs');
const readline = require('readline');
const data = [];


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

//read all source files 
const parseSourceFile = (source) => {
  source.forEach(file => {
    readSourceFile(file)
      .then(() => {
        return data;
      })
  });
}

//read source file line by line
async function readSourceFile(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    //parse & push the object to data array
    let strArray = line.split('"');
    let date = new Date();
    let orderObject = {
      id: strArray[3],
      order_number: strArray[6].slice(1, -1),
      responsible_person: strArray[9],
      district: strArray[13],
      brand: strArray[17],
      injections: strArray[20].slice(1, -1),
      arrival_date: strArray[23],
      createdAt: date,
      updatedAt: date,
    }
  }
  data.push(orderObject);

};
