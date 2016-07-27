var smartRequire = require("smart-require");
var Server = smartRequire("utils/web/Server");
var sequelize = smartRequire("config/sequelize");
var entities = smartRequire("entities");
var log = smartRequire("utils/logger")("Main");

var cluster = require("cluster");

var cpuNumber = require("os").cpus().length;

if (cluster.isMaster) 
{

    for (var i = 0 ; i < cpuNumber ; i++) 
    {
        cluster.fork();
    }

    cluster.on("exit", function(worker, code, signal)
    {
            log.warn("Worker " + worker.process.pid + " died -- CODE : " + code 
                                    + " / SIGNAL : " + signal);
            log.info("Restarting dead process number " + worker.process.pid);
            cluster.fork();
    });
} 
else 
{
  var server = new Server(666);
  server.addAllRoutes(smartRequire("web"));
  
  server.start();
  
}