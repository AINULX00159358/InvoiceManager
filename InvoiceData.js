const server = require("./server");
const config = require('./config');
const NodeCache = require("node-cache");
const version = server.version;


const cache = new NodeCache({ stdTTL: 240 });

cache.on( "set", function( key, value ){
    console.log("added invoice ", "key=", key, " value=", value);
});

const saveToCache = (invoice) => {
   return  cache.set( invoice.invoiceId, invoice);
};

const updatePayment = (payment, invoiceId) => {
    console.log("updating cache for invoiceid ", invoiceId);
    if (cache.has(invoiceId)){
        const invoice  = cache.get(invoiceId);
        invoice.paid = 'y';
        invoice.paidOn = payment.paidOn;
        invoice.remittanceId = payment.remittanceId;
        return saveToCache(invoice);
    }
    console.error("unable to get invoice for invoiceid ", invoiceId)
    return false;
};

const getInvoices = (key) => {
    if (key == null) {
        return cache.mget(cache.keys());
    }
   return cache.mget([key]);
}

const getUnpaidInvoices = () => {
    const list = []
    cache.keys().map(k => cache.get(k)).filter(i => i.paid === 'n').forEach(x => list.push({
        "invoiceId": x.invoiceId,
        "amount": x.amount}
    ));
    return list;

    // for (key in cache.keys()){
    //     if (cache.get(key).paid)
    // }
}

server.app.get('/', (req, res) => {
   res.set("version", version);
    res.send('No Used');
});

server.app.get('/health', (req, res) => {
   res.set("version", version);
    res.send('Healthy');
});

server.app.post('/saveInvoice', (req, res) => {
 console.log('receiving data ...');
    console.log('body is ',req.body.invoiceId);
   res.set("version", version);
   if (saveToCache(req.body)) {
       res.sendStatus(200);
   } else {
       res.sendStatus(501);
   }
});

server.app.get('/getInvoices', (req, res) => {
    res.set("version", version);
    res.status(200).json(getInvoices(req.query.id));
});

server.app.get('/getUnPaid', (req, res) => {
    res.set("version", version);
    res.status(200).json(getUnpaidInvoices());
});


server.app.post('/updatePayment', (req, res) => {
     console.log('received payment for ',req.body);
    res.set("version", version);
     if (updatePayment(req.body, req.body.invoiceId)) {
         res.sendStatus(200);
     } else {
         res.sendStatus(501);
     }
});

server.listen(config.PORT);
