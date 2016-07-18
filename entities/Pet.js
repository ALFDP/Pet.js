var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var Post = require("./Post");
var Comment = require("./Comment");
var User = require("./User");
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
            type: Sequelize.STRING
    }
};

var model = extraLayer.register("Pet", "pet", Pet);

model.hasMany(Post);
model.hasMany(Comment);
model.hasMany(model);
model.belongsTo(User);

module.exports = model;