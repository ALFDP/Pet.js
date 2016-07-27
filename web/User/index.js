var smartRequire = require("smart-require");
var Route = smartRequire("utils/web/Route");
var User = smartRequire("entities/User");
var Session = smartRequire("entities/Session");
var sha256 = require("sha256");
var log = smartRequire("utils/logger")("User");

var userSignUp = new Route("/user", "put", function(request, response){
    
    if(request.body.login !== undefined && request.body.pass !== undefined)
    {
        var loginRegex = /\w{2,20}/;
        var passRegex = /\w{2,20}/;
        if(request.body.login.match(loginRegex) && request.body.pass.match(passRegex))
        {
            User.findAndCountAll({
                where: { login: request.body.login}
            }).then(function(result) {
                if(result.count !== 0)
                {
                    response.json({
                        message: "User failed to be added",
                        error: "User already exists"
                    });
                }
                else
                {
                    User.build({
                        login: request.body.login,
                        password: sha256(request.body.pass)
                    })
                    .save()
                    .then(function() {
                        response.json({
                            message: "User succesfully added"
                        });
                    });
                }
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
});

var userSignIn = new Route("/user", "post", function(request, response){
    if(request.body.login !== undefined && request.body.pass !== undefined)
    {
        var loginRegex = /\w{2,20}/;
        var passRegex = /\w{2,20}/;
        if(request.body.login.match(loginRegex) && request.body.pass.match(passRegex))
        {
            User.findOne({
                where: { login: request.body.login,password: sha256(request.body.pass)}
            }).then(function(result) {
                if(!result)
                {
                    response.json({
                        message: "User failed to sign in",
                        error: "User doesn't exist"
                    });
                }
                else
                {
                    var token = sha256("" + Date.now() + Math.random() * 1234);
                    var session = Session.build({
                        token: token,
                        expire: Date.now() + 3600000
                    });
                    
                    session.setUser(result).then(function(){
                        session.save().then(function() {
                            response.json({
                                message: "User succesfully signed in",
                                token: token
                            });
                        });
                    });
                    
                }
            }).catch(function(err) {
                log.error(err);
                response.json({
                    message: "User not signed in",
                    error: JSON.stringify(err)
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
});

module.exports = [userSignUp, userSignIn];