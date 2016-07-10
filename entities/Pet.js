var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var Post = require("./Post");
var Comment = require("./Comment");
var User = require("./User");

var Pet = sequelize.define('Pet', 
{
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    born : Sequelize.DATE
});

Pet.hasMany(Post);
Pet.hasMany(Comment);
Pet.hasMany(Pet);
Pet.belongsTo(User);

module.exports = Comment;