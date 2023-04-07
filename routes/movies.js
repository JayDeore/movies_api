const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello World!');
  });

  
// post all 
router.post('/add-movie', async (req,res) => {
    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        rating: req.body.rating
    })

    try{
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

// get all
router.get('/get-all', async (req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    try{
        const movie = await Movie.find()
        res.json(movie)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// get single by id
router.get('/get-single', async (req,res) => {
    const id = req.query.id
    try {
        const movie = await Movie.findById(id);
        res.send(movie);
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

// get-paginated
router.get('/get-paginated', async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const skip = (page - 1) * size;
    try {
      const movies = await Movie.find().skip(skip).limit(size);
      res.send(movies);
    } catch (err) {
      res.status(500).send(err);
    }
});


module.exports = router