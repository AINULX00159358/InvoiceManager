const request = require('request');
const model = require("./model");
const uuid = require('uuid');
const config = require('./config');
const server = require("./server");

const version = server.version;

server.app.post('/generate', (req, res) => {
    res.set("version", version);
    console.log(req.body);
    const invoice = model.generateInvoice(req.body.clientId, req.body.amount)
    addInvoice(invoice);
    res.send(invoice);
});

server.app.get('/health', (req, res) => {
    res.set("version", version);
    res.send('Healthy');
});

function addInvoice(invoice) {
    request.post({
      headers: {'content-type' : 'application/json'},
      url:     config.DATA_URL+'/saveInvoice',
      body:    JSON.stringify(invoice)
    }, function(error, response, body){
      console.log(response.statusCode);
    });
}

server.listen(config.PORT);
