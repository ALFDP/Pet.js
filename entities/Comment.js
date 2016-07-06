var Sequelize = require("sequelize");
var Post = require("./Post");
var Pet = require("./Pet");

var Comment = sequelize.define('Comment', 
{
    id: Sequelize.INTEGER,
    message: Sequelize.STRING
});

Comment.belongsTo(Post);
Comment.belongsTo(Pet);

module.exports = Comment;