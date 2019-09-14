const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Send details of dishes');
});

app.post('/dishes', (req, res, next) => {
    res.end('Add dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported.');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Send dishes');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Send details of dish: ' + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end('Will update the dish: ' + req.body.name + '\n' +
        'with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting the dish: ' + req.params.dishId);
});

app.use((req, res, next) => {
    req.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Express Server!</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});