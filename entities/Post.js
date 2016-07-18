var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var Comment = require("./Comment");
var extraLayer = smartRequire("config/extraLayer");

var Post = {
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

var model = extraLayer.register("Post", "post", Post);

model.hasMany(Comment);

module.exports = model;