const express = require('express'),
    bodyParser = require('body-parser'),
    // favicon = require('serve-favicon'),
    morgan = require('morgan'),
    routes = require('./routes/index'),
    // faviconURL = `${__dirname}/public/img/node-favicon.png`,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    app = express()

app
// configurando app
    .set('views', viewDir)
    .set('view engine', 'pug')
    .set('port', port)
    // ejecutando middlewares
    // .use(favicon(faviconURL))

// parse application/json
.use(bodyParser.json())
    // parse application//x-www-form-urlencode
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan('dev'))
    .use(publicDir)

// ejecutando el middleware enrutador
.use(routes)

module.exports = app