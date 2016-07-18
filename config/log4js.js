module.exports = { 
   "appenders": [
      {
        "type": "console",
        "layout": {
          "type": "pattern",
          "pattern": "%[%r (%x{pid}) %p %c -%] %m%n",
          "tokens": {
            "pid" : function() { return process.pid; }
          }
        }
      }
    ]
  }