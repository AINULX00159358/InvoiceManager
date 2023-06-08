const model = require("./model");
const request = require('request');
const bodyParser = require('body-parser');
const config = require('./config');
const server = require("./server");


server.app.get('/', (req, res) => {
    res.send('Invoice app version 1.00');
});

server.app.post('/new', (req, res) => {
    let port = config.GENERATOR_PORT;
    request.post({
             headers: {'content-type' : 'application/json'},
             url:     'http://localhost:'+port+'/generate',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
             res.send(JSON.parse(body));
           });
});

server.app.post('/payment', (req, res) => {
       let port = config.PAYMENT_PORT;
       request.post({
             headers: {'content-type' : 'application/json'},
             url:     'http://localhost:'+port+'/payment',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
              res.send(JSON.parse(body));
           });
});


server.app.get('/showAll', (req, res) => {
    let port = config.DATA_PORT;
     request.get({
                 headers: {'content-type' : 'application/json'},
                 url:     'http://localhost:'+port+'/getInvoices'
               }, function(error, response, body){
                 res.send(JSON.parse(body));
               });
});


server.listen(config.APP_PORT);