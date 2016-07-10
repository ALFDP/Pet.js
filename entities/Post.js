var Sequelize = require("sequelize");
var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var Comment = require("./Comment");
var Pet = require("./Pet");

var Post = sequelize.define('Post', 
{
    message: Sequelize.STRING,
    date: Sequelize.DATE
});

Post.hasMany(Comment);
Post.belongsTo(Pet);

module.exports = Post;