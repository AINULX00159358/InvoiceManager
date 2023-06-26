
const uuid = require('uuid');

function generateInvoice(clientId, amount, version) {
    return {
         invoiceId: uuid.v4(),
         clientId: clientId + " [version="+version+"]"
         amount: Number(amount),
         date: new Date().toISOString(),
         paid: "n",
         remittanceId:"",
         paidOn:""
    };
}
function generatePayment(invoiceId, amount) {
    return {
        invoiceId: invoiceId,
        amount: parseInt(amount.toString()),
        paidOn: new Date().toISOString(),
        remittanceId: String(Date.now())
        };
}

// add the code below
module.exports = { generateInvoice, generatePayment };
