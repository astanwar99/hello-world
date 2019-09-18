const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    //res.end('Sending details of dishes');
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    //res.end('Add dish: ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created: ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported on /dishes');
})
.delete( (req, res, next) => {
    //res.end('Deleting all dishes');
    Dishes.remove({})
    .then((rem_res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rem_res);
    }, (err) => next(err))
    .catch((err) => next(err));
});


dishRouter.route('/:dishId')
.get((req, res, next) => {
    //res.end('Sending details of dish: ' + req.params.dishId);
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
    // res.write('Updating the dish: ' + req.params.dishId);
    // res.end('\nWill update the dish: ' + req.body.name + '\n' +
    //     'With details: ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then((dish) => {
    console.log('Dish Updated: ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    //res.end('Deleting the dish: ' + req.params.dishId);
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((rem_res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rem_res);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;