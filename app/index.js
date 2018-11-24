const express = require('express')
const app = express()
const secure = require('ssl-express-www');
const port = process.env.PORT || 3000
const max_time = 300000
var last_time = new Date (0)

app.use(secure)

app.get('/', (request, response) => {
    if (new Date().getTime() - last_time.getTime() < max_time)
    {
        response.sendFile('/html/light.html', { root: __dirname })
    }
    else
    {
        response.sendFile('/html/no_light.html', { root: __dirname})
    }
})

app.get('/renew', (request, response) => {
    last_time = new Date()
    response.send('Done!')
})

app.listen(port, (err) => {
    if (err) 
    {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})