const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({extended: false})
const secure = require('ssl-express-www')
const hash = require('sha256')
const fs = require('fs')
const no_light_top = fs.readFileSync(__dirname + '/html/no_light_top.html', 'utf-8')
const no_light_bottom = fs.readFileSync(__dirname + '/html/no_light_bottom.html', 'utf-8')
const port = process.env.PORT || 3000
const max_time = 300000
var last_time = new Date (0)

app.use(secure)
app.use('/static', express.static('app/html'))

app.get('/', (request, response) => {
    if (new Date().getTime() - last_time.getTime() < max_time)
    {
        response.sendFile('light.html', { root: __dirname })
    }
    else
    {
        response.send(
            no_light_top
            + last_time.toLocaleDateString('ru', { day: '2-digit'}) + '.'
            + last_time.toLocaleDateString('ru', { month: '2-digit' }) + '.'
            + last_time.getFullYear().toString() + ' в ' 
            /*+ last_time.toLocaleDateString('ru', { weekday: 'long' }) + ', '*/
            + last_time.toLocaleTimeString('ru', { hour12: false, hour: '2-digit', minute: '2-digit' })
            + no_light_bottom)
        //response.sendFile('/html/light.html', { root: __dirname})
    }
})

app.post("/renew", urlencodedParser, (request, response) => {
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