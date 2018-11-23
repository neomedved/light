const express = require('express')
const app = express()
const in_port = 80
const max_time = 300000
var last_time = new Date (0)

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

app.listen(in_port, (err) => {
    if (err) 
    {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${in_port}`)
})