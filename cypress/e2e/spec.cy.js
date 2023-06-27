let URL = Cypress.env('APPURL');
if (URL == null) {
    URL = "localhost:3000";
}
let load = Cypress.env('TIMES');
if (load == null) {
    load = 10;
}
let versions110 = false;
Cypress._.times(5, () => {
  describe('E2E UI Test HEALTH', () => {
    it('get health', () => {
      cy.request("GET", "http://" + URL + "/health").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body['status']).to.contain('healthy')
        versions110 = (response.body['version'] === '1.1.0') || versions110
      })
    });
  })
});

describe('E2E check version', () => {
    it('versions', () => {
        expect(versions110).to.eq(true)
    });
 });

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function createInvoice(invoiceID, invoiceAmount) {
  return {
    'invoiceId': invoiceID , 'amount' : invoiceAmount
  }
}

Cypress._.times(load, () => {
  describe('E2E UI Test INVOICE CREATE', () => {
    it('new Invoice', () => {
      let data = {
        'clientId': "" + getRandomIntInclusive(322211232, 873343424222),
        'amount': "" + getRandomIntInclusive(1000, 9000)
      }
      //"{'clinetId':"+ "'"+getRandomIntInclusive(100000, 500000)+"', 'amount':"+ 9888+"}";
      console.log(data)
      cy.request({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        url: "http://"+ URL + "/new",
        body: data
      }).then((response) => {
        expect(response.status).to.eq(200)
        console.log(response.body)
      })
    })
  })
});
describe('E2E UI Test INVOICE CREATE', () => {
  it('get Invoices', () => {
    let allInvoice = [];
    cy.request({
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      url: "http://" + URL +"/getAllInvoices"
    }).then((response) => {
      const obj = response.body
      const result = Object.entries(obj).entries()
      let itr = result.next();
      while (! itr.done){
        const invv = itr.value[1][1];
        if (invv['paid'] === 'n') {
          allInvoice.push(createInvoice(invv['invoiceId'], invv['amount']))
        }
        itr = result.next();
      }
      console.log(allInvoice)
      allInvoice.forEach(invoice => {
        cy.request({
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          url: "http://"+ URL +"/doPayment",
          body: invoice
        }).then((payresponse) => expect(payresponse.status).to.eq(200))
      })
    })
  });
})
