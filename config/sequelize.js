var Sequelize = require("sequelize"); 

module.exports = new Sequelize("pet", "root", "", {
	pool: false,
	host: "localhost",
	port: 3306
});