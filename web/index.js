var routes = [];

routes = routes.concat(require("./User"));
routes = routes.concat(require("./Pet"));
routes = routes.concat(require("./Post"));

module.exports = routes;