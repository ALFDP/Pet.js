var smartRequire = require("smart-require");
var Session = smartRequire("entities/Session");
var log = smartRequire("utils/logger")("Auth");

function authenticate(request, response, callback)
{
    Session.findOne({
                where: { token: request.body.token, expire: { $gt: Date.now() } }
            }).then(function (result) {
                if(!result)
                {
                    response.json({
                        message: "Authentication failed",
                        error: "Session is not correct, expired or does not exist"
                    });
                }
                
                else
                {
                    callback(result);
                }
            }).catch(function(err){
                log.error(err);
                response.json({
                    message: "Authentication failed",
                    error: err
                });
            });
}

module.exports = authenticate;

