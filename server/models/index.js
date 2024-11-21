const config = require('../config/dbConfig');
const {Sequelize , Datatypes} = require('sequelize');

const sequelize = new Sequelize(config.DB,config.USER,config.PASSWORD,{
    host: config.HOST,
    dialect: config.DIALECT,
    port:3306,
    operatorAliases : false,

    pool : {
        max : config.max,
        min : config.min,
        acquire : config.acquire,
        idle : config.idle
    }
})

sequelize.authenticate()
.then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(`Error : ${err}`);
})


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require('./employeeModel.js')(sequelize,Datatypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('sync done!')
}).catch((err)=>{
    console.log('sync failure!')
})

module.exports = db
