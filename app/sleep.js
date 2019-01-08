const https = require("https")
const app_domain = 'https://light-in-house.herokuapp.com'

setInterval( () => {
    https.get(app_domain)
}, 600000) // every 10 minutes (600000)