const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Send details of dishes');
})
.post((req, res, next) => {
    res.end('Add dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported.');
})
.delete( (req, res, next) => {
    res.end('Deleting dishes');
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end('Send details of dish: ' + req.params.dishId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end('\nWill update the dish: ' + req.body.name + '\n' +
        'With details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the dish: ' + req.params.dishId);
});

module.exports = dishRouter;