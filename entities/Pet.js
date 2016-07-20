var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var Post = require("./Post");
var extraLayer = smartRequire("config/extraLayer");

var Pet = {
    id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
    },
    name: {
            type: Sequelize.STRING
    },
    type: {
            type: Sequelize.STRING
    },
    born : {
            type: Sequelize.DATE
    }
};

var model = extraLayer.register("Pet", "pet", Pet);

model.hasMany(Post);
model.hasMany(model);

module.exports = model;