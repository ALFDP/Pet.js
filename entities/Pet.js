var Sequelize = require("sequelize");
var Post = require("./Post");
var Comment = require("./Comment");
var User = require("./User");

var Pet = sequelize.define('Pet', 
{
    id: Sequelize.INTEGER,
    message: Sequelize.STRING
});

Pet.hasMany(Post);
Pet.hasMany(Comment);
Pet.belongsTo(User);

module.exports = Comment;