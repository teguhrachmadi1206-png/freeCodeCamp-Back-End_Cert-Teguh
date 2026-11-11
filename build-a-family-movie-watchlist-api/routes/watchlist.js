import express from 'express';
import { getWatchlist, addMovie, updateMovie, deleteMovie } from '../utils/db.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';

const router = express.Router();

router.get('/:userId', authenticate, (req, res) => {
    const movies = getWatchlist(Number(req.params.userId))
    if (movies) {
        return res.status(200).json(movies);
    }
})

router.post('/:userId/movies', authenticate, authorizeModification, (req, res) => {
    const movies = addMovie(Number(req.params.userId), { title: req.body.title, genre: req.body.genre })    
    if (movies) {
        return res.status(201).json(movies)
    }
})

router.put('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const movie = updateMovie(Number(req.params.userId), Number(req.params.movieId), req.body)
    if (movie) {
        res.status(200).json(movie)
    }
})

router.delete('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const deleted = deleteMovie(Number(req.params.userId), Number(req.params.movieId))
    if (deleted) {
        return res.status(200).json({ "message": "Movie deleted" });
    }
})

export default router;
