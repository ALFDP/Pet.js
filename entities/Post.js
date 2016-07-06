var Sequelize = require("sequelize");
var Comment = require("./Comment");
var Pet = require("./Pet");

var Post = sequelize.define('Post', 
{
    id: Sequelize.INTEGER,
    message: Sequelize.STRING
});

Post.hasMany(Comment);
Post.belongsTo(Pet);

module.exports = Post;