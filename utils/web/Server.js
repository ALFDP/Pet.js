var smartRequire = require("smart-Require");
var Route = smarteRequire("Route");
var express = require("express");

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
    
    for(var i = 0 ; i < length ; i++)
    {
        var route = this.routes[i];
        this.app[route.method](route.url, route.callback);
    }
    
    this.app.listen(this.port);
}