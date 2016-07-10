var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var User = require("./Pet");

var Session = sequelize.define('User', 
{
    token: Sequelize.STRING,
    expire: Sequelize.DATE
});

Session.belongsTo(User);

module.exports = User;