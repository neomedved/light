const express = require('express')
const app = express()
const port = 8080
const root_dir = '/home/artem/temp/Projects/light'

app.get('/', (request, response) => {
    response.sendFile('/html/light.html', { root: root_dir })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})