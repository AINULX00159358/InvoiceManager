// Cypress._.times(5, () => {
//   describe('E2E UI Test HEALTH', () => {
//     it('get health', () => {
//       cy.request("GET", "http://localhost:3000/health").then((response) => {
//         expect(response.status).to.eq(200)
//         expect(response.body).to.contain('Healthy')
//       })
//     });
//   })
// });
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

Cypress._.times(500, () => {
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
        url: 'http://localhost:3000/generate',
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
      url: "http://localhost:3000/getAll"
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
          url: "http://localhost:3100/payment",
          body: invoice
        }).then((payresponse) => expect(payresponse.status).to.eq(200))
      })
    })
  });

})
