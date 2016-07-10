var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var Post = require("./Post");
var Pet = require("./Pet");

var Comment = sequelize.define('Comment', 
{
    message: Sequelize.STRING,
    date: Sequelize.DATE
});

Comment.belongsTo(Post);
Comment.belongsTo(Pet);

module.exports = Comment;