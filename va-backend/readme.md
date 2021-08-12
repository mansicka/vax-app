# va-backend
A backend service for vax-app front end application

## **Introduction**

sa-backend is a backend service for vax-app for node.js. It uses Sequelize to communicate with a database, and thus is completely independed on database type, though only Mysql database setup has been properly tested. sa-backend also uses express to serve json data to a front end application. This is also my first try using a pre-built ORM, and as such it was a refreshing exercise.

## **Dependencies**

va-backend has following dependencies:

cors - for CORS

express- for http server functionality

helmet- for securing connections

line-by-line - for parsing source files for database initialation

mysql2 - ...or any other database driver. For compatible drivers, see https://sequelize.org/

sequelize - for object based database relation mapping

sequelize-cli - for seeding the database for database initialation


## **Setup**

To install required packages, run 'npm install'.

Set up your database connection of choice in /config/config.js

To seed the database, you first need to change the seeders bash script file permissions to be executable. In the main directory, run:

     chmod +x run_seeders 
     
Then you can start the database seeding process by running 

    ./run_seeders 

For non-bash users, you can do this manually by running the seeding scripts:

    npx sequelize db:seed --seed 20210801085403-OrderData.js
    npx sequelize db:seed --seed  20210801085348-VaccinationData.js


Now, if everything goes well and should the scripts run without errors, you can start the sa-backend service by running:

    npm start




