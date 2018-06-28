const app = require('./app.js'),
    server = app.listen(app.get('port'), () => {
        console.log(`Iniciando Servidor en el puerto ${app.get('port')}`)
    })