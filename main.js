var smartRequire = require("smart-require");
var Server = smartRequire("utils/web/Server");
var sequelize = smartRequire("config/sequelize");
var entities = smartRequire("entities");

var cluster = require("cluster");

var cpuNumber = require("os").cpus().length;
/*
if (cluster.isMaster) 
{

    for (var i = 0 ; i < cpuNumber ; i++) 
    {
        cluster.fork();
    }

    cluster.on("exit", function(worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
      });
} 
else 
{*/
  var server = new Server(666);
  server.addAllRoutes(smartRequire("web"));
  
  server.start();
  
//}