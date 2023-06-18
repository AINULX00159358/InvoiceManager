const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const uuid = require('uuid');

function generateInvoice(clientId, amount) {
    return {
         invoiceId: uuid.v4(),
         clientId: clientId,
         amount: formatter.format(amount),
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
