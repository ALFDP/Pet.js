var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var User = require("./User");
var extraLayer = smartRequire("config/extraLayer");

var Session = {
    id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
    },
    token: {
            type: Sequelize.STRING
    },
    expire: {
            type: Sequelize.DATE
    }
};

var model = extraLayer.register("Session", "session", Session);

model.belongsTo(User);

module.exports = model