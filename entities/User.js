var Sequelize = require("sequelize");
var Pet = require("./Pet");

var User = this.sequelize.define('User', 
{
    id: Sequelize.INTEGER,
    token: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING
});

User.hasMany(Pet);

module.exports = User;