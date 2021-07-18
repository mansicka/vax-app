const inquirer = require('inquirer')

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
  
setTimeout(inquire, 2000,);
module.exports.inquirer = inquirer;