var http = require("http");
const app_domain = 'http://light-in-house.herokuapp.com'

setInterval(function() {
    http.get(app_domain);
}, 1500000); // every 25 minutes (1500000)