const model = require("./model");
const request = require('request');
const bodyParser = require('body-parser');
const config = require('./config');
const server = require("./server");


server.app.get('/', (req, res) => {
    res.send('Invoice app version 1.00');
});

server.app.get('/health', (req, res) => {
    res.send('Healthy');
});

server.app.post('/new', (req, res) => {
    request.post({
             headers: {'content-type' : 'application/json'},
             url:     config.GENERATOR_URL+'/generate',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
             res.send(JSON.parse(body));
           });
});

server.app.post('/payment', (req, res) => {
       request.post({
             headers: {'content-type' : 'application/json'},
             url:     config.PAYMENT_URL+'/payment',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
              res.send(JSON.parse(body));
           });
});


server.app.get('/showAll', (req, res) => {
     request.get({
                 headers: {'content-type' : 'application/json'},
                 url:     config.DATA_URL+'/getInvoices'
               }, function(error, response, body){
                 res.send(JSON.parse(body));
               });
});


server.listen(config.PORT);