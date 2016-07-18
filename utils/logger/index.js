var log4js = require("log4js");
var smartRequire = require("smart-require");

log4js.configure(smartRequire("config/log4js"));

function getLogger(logger)
{
    return log4js.getLogger(logger);
}

module.exports = getLogger;