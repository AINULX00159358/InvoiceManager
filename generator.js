const request = require('request');
const model = require("./model");
const uuid = require('uuid');
const server = require("./server");
const config = require('./config');

server.app.post('/generate', (req, res) => {
    const invoice = model.generateInvoice(req.body.clientId, req.body.amount)
    addInvoice(invoice);
    res.send(invoice);
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