const server = require("./server");
const model = require("./model");
const config = require('./config');
const map = new Map();

server.app.get('/', (req, res) => {
    res.send('No Used');
});

server.app.get('/health', (req, res) => {
    res.send('Healthy');
});

server.app.post('/saveInvoice', (req, res) => {
 console.log('receiving data ...');
    console.log('body is ',req.body.invoiceId);
    const invoiceId = req.body.invoiceId;
    if (map.has(invoiceId)){
       console.log( map.delete(invoiceId) );
    }
    map.set(req.body.invoiceId, req.body);
   res.sendStatus(200);
});

server.app.get('/getInvoices', (req, res) => {
    if (req.query.id == null){
        const arr = Array.from(map)
        res.send(arr);
        return;
    }
    res.send(map.get(req.query.id))
});


server.app.post('/updatePayment', (req, res) => {
     console.log('body is ',req.body.invoiceId);
     const invoiceId = req.body.invoiceId;

     if (!map.has(invoiceId)){
            console.log( "unable to find invoice" );
            res.sendStatus(404);
            return;
         }
     const invoice = map.get(invoiceId);
     console.log( "Invoice to Update ", invoice );
     invoice.paid = 'y';
     invoice.paidOn = req.body.paidOn;
     invoice.remittanceId = req.body.remittanceId;
     map.set(req.body.invoiceId, invoice);
     res.sendStatus(200);
});

server.listen(config.PORT);