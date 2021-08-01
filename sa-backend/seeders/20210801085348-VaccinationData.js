'use strict';
const source = ['./seeders/source/vaccinations.source'];
const fs = require('fs');
const readline = require('readline');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    parseSourceFile(source)
      .then((data) => {
        console.log(data)
        // return queryInterface.bulkInsert('Vaccinations', data)
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
    console.log(source.length)
    while (n < source.length) {
      source.forEach(file => {
        readSourceFile(file)
          .then((r) => {
            result = result.concat(r);
            n++;
          });
        if (n == source.length) {
          resolve(result);
        }
      })
    };
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
      let date = new Date();
      let vaccinationObject = {
        id: strArray[3],
        gender: strArray[11],
        date: strArray[15],
        origin_id: strArray[7],
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
