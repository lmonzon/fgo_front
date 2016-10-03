// server/index.js
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

/** Express configuration */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

/** API routes */
// Muestra todos los speakers.
app.get('/api/speakers', (req, res) => {
  res.sendFile(path.join(__dirname, 'db', 'speakers.json'))
})

// Muestra info de un único speaker.
app.get('/api/speakers/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'db', `${req.params.id}.json`))
})

// envía el index.html para la SPA.
app.get('*', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  } else {
    next()
  }
})

/** Inicia el servidor */
app.listen(3000, () => console.log('Express running on port 3000'))
