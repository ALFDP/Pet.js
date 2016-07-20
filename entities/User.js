var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var Pet = require("./Pet");
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

model.hasMany(Pet);

module.exports = model;