const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const secure = require('ssl-express-www')
const hash = require('sha256')
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

app.post("/renew", bodyParser, (request, response) => {
    if (!request.body)
    {
        return response.sendStatus(400)
    }
    if (hash(request.body.pass) === 'a27129a74cfc7e0441cacdec75a913e2824d770d797970014cfc6a75dec633bf')
    {
        last_time = new Date()
        response.send('Done!')
    }
    else
    {
        response.send('Fail!')
    }
})

app.listen(port, (err) => {
    if (err) 
    {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})