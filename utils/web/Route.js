
var Route = function(url, method, callback) {
    this.url = url;
    this.method = method;
    this.callback = callback;
}

module.exports = Route;