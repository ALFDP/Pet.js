var smartRequire = require("smart-require");
var sequelize = smartRequire("config/sequelize");
var Post = require("./Post");
var Pet = require("./Pet");
var Comment = require("./Comment");
var User = require("./User");
var Session = require("./Session");

sequelize.sync();