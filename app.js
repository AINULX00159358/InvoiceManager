const model = require("./model");
const request = require('request');
const bodyParser = require('body-parser');
const config = require('./config');
const server = require("./server");

const version = server.version;

server.app.use(bodyParser.json());
server.app.get('/', (req, res) => {
   res.set('version', version);
    res.send('Invoice app version '+ version);
});

server.app.get('/health', (req, res) => {
    res.set('version', version);
    res.send('Healthy');
});

server.app.get('/create', (req, res) => {
    res.set('version', version);
    res.sendFile(__dirname + '/html/invoice.html');
});

//server.app.post('/newTest', (req, res) => {
//    console.log(JSON.stringify(req.body))
//    res.set('version', version);
//    const invoice = model.generateInvoice(req.body.clientId, req.body.amount)
//    console.log(invoice);
//    res.send(JSON.stringify(invoice));
//});


server.app.post('/new', (req, res) => {
    request.post({
             headers: {'content-type' : 'application/json'},
             url:     config.GENERATOR_URL+'/generate',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
              res.set('version', version);
             res.send(JSON.parse(body));
           });
});

server.app.post('/payment', (req, res) => {
       request.post({
             headers: {'content-type' : 'application/json'},
             url:     config.PAYMENT_URL+'/payment',
             body:    JSON.stringify(req.body)
           }, function(error, response, body){
              res.set('version', version);
              res.send(JSON.parse(body));
           });
});


server.app.get('/showAll', (req, res) => {
   res.set('version', version);
    res.sendFile(__dirname + '/html/listAllInvoices.html');
});

server.app.get('/getAllInvoices', (req, res) => {
     request.get({
                 headers: {'content-type' : 'application/json', 'version': version},
                 url:     config.DATA_URL+'/getInvoices'
               }, function(error, response, body){
                 res.set('version', version);
                 res.send(JSON.parse(body));
               });
});

function collectFormData(req, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(req.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            var parsedBody = parse(body);
            var myObj = {
               id: "c001",
               name: "Hello Test"
            }
			callback(parsedBody.invoiceId, parsedBody.clientId, parsedBody.amount, parsedBody.date);
        });
    }
    else {
        callback(null);
    }
}


server.listen(config.PORT);