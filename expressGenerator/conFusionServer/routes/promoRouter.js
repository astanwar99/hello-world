const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Sending details of promotions');
})
.post((req, res, next) => {
    res.end('Add promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported on /promotions');
})
.delete( (req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Sending details of promo: ' + req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId);
    res.end('\nWill update the promotion: ' + req.body.name + '\n' +
        'With details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the promotion: ' + req.params.promoId);
});

module.exports = promoRouter;