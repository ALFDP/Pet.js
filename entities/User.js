var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var extraLayer = smartRequire("config/extraLayer");

var User = {
    id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
    },
    login: {
            type: Sequelize.STRING
    },
    password: {
            type: Sequelize.STRING
    }
};


var model = extraLayer.register("User", "user", User);

module.exports = model;