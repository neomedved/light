const https = require("https")
const app_domain = 'https://light-in-house.herokuapp.com'

setInterval( () => {
    https.get(app_domain)
}, 500000) // every 5 minutes (500000)