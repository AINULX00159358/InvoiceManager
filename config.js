const PORT = process.env.PORT  || 3000

const GENERATOR_URL = process.env.GENERATOR_URL || 'http://localhost:3100'
const PAYMENT_URL = process.env.PAYMENT_URL || 'http://localhost:3200'
const DATA_URL = process.env.DATA_URL || 'http://localhost:3300'

module.exports = {PORT, GENERATOR_URL, PAYMENT_URL, DATA_URL};
