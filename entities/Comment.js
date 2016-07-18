var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var extraLayer = smartRequire("config/extraLayer");

var Comment = {
    id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
    },
    message: {
            type: Sequelize.STRING
    },
    date: {
            type: Sequelize.DATE
    }
};

var model = extraLayer.register("Comment", "comment", Comment);

module.exports = model;