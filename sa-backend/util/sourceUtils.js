const controller = require("../controller/controller");
const inquirer = require('inquirer')

// var orderSources = ['./SolarBuddhica.source', './Antiqua.source', './Zerpfy.source'];
const parseSourceFile = (source) => {
    var LineByLineReader = require('line-by-line'),
        lr = new LineByLineReader(source);

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
                source_bottle: source_bottle
            })


        }
        // else it should be order info, do as above
        else {
            let order_id = strArray[3];
            let order_number = strArray[6].slice(1, -1);
            let responsible_person = strArray[9];
            let district = strArray[13];
            let brand = strArray[17];
            let injections = strArray[19].slice(1, -1);
            let arrival_date = strArray[23];

            controller.importOrder({
                order_id: order_id,
                order_number: order_number,
                responsible_person: responsible_person,
                district: district,
                vaccine_brand: brand,
                injections: injections,
                arrival_date: arrival_date

            })


        }
        lr.resume();

    });

    lr.on('end', function () {
        console.log('Done! Source file was: ' + source);
    });
}
const inquire = () => {
    var questions = [
        {
          type: 'input',
          name: 'source',
          message: "source file location: \n"
        }
      ]
      
      
      
      const prompt = () => {
        console.log('\x1b[33m','If you need to add *.source files to db, these need to be done in particular order to reach db integrity. Add source files now?')
        inquirer.prompt(questions)
      
      .then(answers => {
        console.log('aaa' + answers.nameg)
      })
      }
}
var questions = [
    {
      type: 'input',
      name: 'source',
      message: "source file location: \n"
    }
  ]
  
  
  
  const inquire = () => {
    console.log('\x1b[33m','If you need to add *.source files to db, input location')
    inquirer.prompt(questions)
  
  .then(answers => {
    console.log('aaa' + answers.nameg)
  })
  }
  


