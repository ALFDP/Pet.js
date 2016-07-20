var smartRequire = require("smart-Require");
var Route = smartRequire("utils/web/Route");
var express = require("express");
var log = smartRequire("utils/logger")("Server");
var bodyParser = require('body-parser');

var Server = function(port) {
    this.app = undefined;
    this.port = port;
    this.routes = [];
}

Server.prototype.addRoute = function(route) {
    if (route instanceof Route)
    {
        this.routes.push(route);
    }
}

Server.prototype.addAllRoutes = function(routes) {
    if(routes !== undefined)
    {
        for(var i = 0 ; i < routes.length ; i++)
        {
            this.addRoute(routes[i]);
        }
    }
}

Server.prototype.start = function() {
    this.app = express();
    var length = this.routes.length;
    
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    
    for(var i = 0 ; i < length ; i++)
    {
        this.initRoute(i);
    }
    
    log.info("Listening on port " + this.port);
    this.app.listen(this.port);
}

Server.prototype.initRoute = function(i) {
    var self = this;
    var route = this.routes[i];
    this.app[route.method](route.url, function(request, response){
        log.info("Route " + route.url + ":" + route.method + " has been hit");
        if(route.method === "get")
        {
            request.body = request.query;
        }
        route.callback(request, response);
    });
}

module.exports = Server;