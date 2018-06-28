const movies = require('../models/movies'),
  express = require('express'),
  router = express.Router()

const error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: 'Error 404',
      description: 'Recurso no Encontrado',
      error
    }
  error.status = 404

  res.render('error', locals)

  next()
}

router
  .use(movies)
  .get('/', (req, res, next) => {
    req.getConnection((err, movies) => {
      movies.query('SELECT * FROM movie', (err, rows) => {
        if(err) {
          next(new Error('No hay Peliculas'))
        } else {
          let locals = {
            title: 'Lista de Peliculas',
            data: rows
          }
          res.render('index', locals)
        }
      })
    })
  // next()
  })
  .get('/agregar', (req, res, next) => {
      res.render('add-movie', { title: 'Agregar Película' })
  })
  .post('/', (req, res, next) => {
    req.getConnection((err, movies) => {
      let movie = {
        movie_id      : req.body.movie_id,
        title         : req.body.title,
        release_year  : req.body.release_year,
        rating        : req.body.rating,
        image         : req.body.image
      }
      console.log(movie)

      movies.query('INSERT INTO movie SET ? ', movie, (err, rows) => {
        return (err) ? next(new Error('Error al insertar el registro')) : res.redirect('/')
      })
    })
  })
  .get('/editar/:movie_id', (req, res, next) => {
    let movie_id = req.params.movie_id
    console.log(movie_id)
    req.getConnection((err, movies) => {
      movies.query('SELECT * FROM movie WHERE movie_id = ?', movie_id, (err, rows) => {
        console.log(err, '---', rows)
        if(err) {
          next(new Error('Registro No Encontrado'))
        }else {
          let locals = {
            title: 'Editar Pelicula',
            data: rows
          }
          res.render('edit-movie', locals)
        }
      })
    })
  })
  .post('/actualizar/:movie_id', (req, res, next) => {
    req.getConnection((err, movies) => {
      let movie = {
        movie_id      : req.body.movie_id,
        title         : req.body.title,
        release_year  : req.body.release_year,
        rating        : req.body.rating,
        image         : req.body.image
      }
      console.log(movie)
      movies.query('UPDATE movie SET ? WHERE movie_id = ?', [movie,movie.movie_id], (err, rows) => {
        return (err) ? next(new Error('Error al Actualizar')) : res.redirect('/')
      })
    })
  })
  .post('/eliminar/:movie_id', (req, res, next) => {
    let movie_id = req.params.movie_id
    console.log(movie_id)

    req.getConnection((err, movies) => {
      movies.query('DELETE FROM movie WHERE movie_id = ? ', movie_id, (err, rows) => {
        console.log(err, '---', rows)
        return (err) ? next(new Error('Resgitro No Encontrado')) : res.redirect('/')
      })
    })
  })
  .use(error404)

module.exports = router