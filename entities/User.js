var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var Pet = require("./Pet");
var Session = require("./Session");

var User = sequelize.define('User', 
{
    login: Sequelize.STRING,
    password: Sequelize.STRING
});

User.hasMany(Pet);
User.hasMany(Session);

module.exports = User;