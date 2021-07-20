const controller = require("./controller/controller");
const db = require('./models/database')
orderSources = ['./source/SolarBuddhica.source', './source/Antiqua.source', './source/Zerpfy.source'];
vaccinationsSource = ['./source/vaccinations.source'];
const readline = require('readline');

//this is a mess and i'm never going to clean this up, deal with it

var myArgs = process.argv.slice(2);
var array = [];
console.log("\n \n ******THIS TOOL IMPORTS *.SOURCE FILES TO DB. ONLY RUN AFTER DB FILE DELETION******\n \n \
Instructions: node sourceUtils.js *argument* \n argument can be either 'orders' or 'vaccinations \n \n");
db.sequelize.sync()
  .then(() => {
    console.log(process.env.npm_package_name + '\
 : database init ok')
  })
  .then(() => {
    start()
  });

const start = () => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n \n  Insert ' + myArgs[0] + ' source files for orders to db? y/n   ', (input) => {
    if (String(input.trim()).toLowerCase() === 'y') {
      console.log('Adding source files ...');
      console.log(array)
      parseSourceFile(array);
    }

    else if (String(input.trim()).toLowerCase() === 'n') {
      console.log('Not adding source files!');
      db.sequelize.close()
        .then(() => {
          process.exit();
        });

    }
  }
  )
}


const parseSourceFile = (source) => {
  source.forEach(file => {
    var LineByLineReader = require('line-by-line'),
      lr = new LineByLineReader(file);

    //output error
    lr.on('error', function (err) {
      console.log(err);
    });

    //each line do something 
    lr.on('line', function (line) {
      // pause emitting of lines...
      lr.pause();

      let strArray = line.split('"');
      // if string includes vaccination data, rip data and insert into db
      if (strArray[1].includes('vacc')) {
        let vaccine_id = strArray[3];
        let source_bottle = strArray[7];
        let gender = strArray[11];
        let date = strArray[15];

        controller.importVaccination({
          id: vaccine_id,
          gender: gender,
          date: date,
          origin_id: source_bottle
        })
      }

      // else it should be order info, do as above
      else {
        var order_id = strArray[3];
        var order_number = strArray[6].slice(1, -1);
        var responsible_person = strArray[9];
        var district = strArray[13];
        var brand = strArray[17];
        var injections = Number(strArray[20].slice(1, -1));
        var arrival_date = strArray[23];
        //find all vaccinations per order_id, calculate vaccinations left for order
        controller.findAllVaccinationsByOriginOrderId(order_id)
          .then(function (result, err) {
            var injections_left = injections - result;
            console.log(injections_left)
            controller.importOrder({
              order_id: order_id,
              order_number: order_number,
              responsible_person: responsible_person,
              district: district,
              vaccine_brand: brand,
              injections: injections,
              injections_left: injections_left,
              arrival_date: arrival_date

            })
          });
      }

      lr.resume();

    });

    lr.on('end', function () {
      console.log('Done! Source file was: ' + file);
      console.log(source)
    });


  })
}
switch (myArgs[0]) {
  case 'vaccinations':
    array = vaccinationsSource;
    break;
  case 'orders':
    array = orderSources;
    break;
  default:
    console.log('no argument given!')
    process.exit();
}
