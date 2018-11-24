const https = require("https");
const app_domain = 'https://light-in-house.herokuapp.com'

setInterval(function() {
    https.get(app_domain);
}, 1500000); // every 25 minutes (1500000)