const request = require('request');
const model = require("./model");
const server = require("./server");
const config = require('./config');

server.app.post('/payment', (req, res) => {
   console.log("Receive Payments")
   const payment = model.generatePayment(req.body.invoiceId, req.body.amount)
       doPayment(payment);
       res.send(payment);
   });

   function doPayment(payment) {
       request.post({
         headers: {'content-type' : 'application/json'},
         url:     config.DATA_URL+'/updatePayment',
         body:    JSON.stringify(payment)
       }, function(error, response, body){
         //console.log(response.statusCode);
       });
   }
   
server.listen(config.PORT);