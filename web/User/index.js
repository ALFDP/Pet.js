var smartRequire = require("smart-require");
var Route = smartRequire("utils/web/Route");
var User = smart-require("entities/User");
var sha256 = require("sha56");

var userSignUp = new Route("/user", "add", function(request, response){
    
    if(request.body.login !== undefined && request.body.pass !== undefined)
    {
        var loginRegex = /\w{5,20}/;
        var passRegex = /\w{5,20}/;
        if(request.body.login.match(loginRegex) && request.body.pass.match(passRegex))
        {
            Project.build({
                login: request.body.login,
                password: sha256(request.body.pass)
            })
            .save()
            .success(function() {
                response.json({
                    message: "User failed to be added"
                });
            }).error(function(error) {
                response.json({
                    message: "User failed to be added",
                    error: error
                });
            });
        }
        else
        {
            response.json({
                message: "User failed to be added",
                error : "Login and/or password field doesn't match with regex specifications"
            });
        }
    }
    
    else
    {
        response.json({
            message: "User failed to be added",
            error: "Login and/or password field is empty"
        });
    }
})

module.exports = [userSignUp];