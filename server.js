const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose.connection
const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true})
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('connected to Database'))


app.use(express.json())
const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)


app.listen(3000, ()=> console.log('Server Started'))
