const request = require('request');
const model = require("./model");
const server = require("./server");
const config = require('./config');

server.app.post('/payment', (req, res) => {
   console.log("Receive Payments")
   const payment = model.generatePayment(req.body.invoiceId, req.body.amount)
    console.log(" Payments = ", payment)
       doPayment(payment);
       res.sendStatus(200)
   });

server.app.get('/health', (req, res) => {
    res.send('Healthy');
});

function doPayment(payment) {
    request.post({
         headers: {'content-type' : 'application/json'},
         url:     config.DATA_URL+'/updatePayment',
         json:    payment
       }, function(error, response, body){

       });
   }

server.listen(config.PORT);
