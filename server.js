const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

function listen(port) {
    app.listen(port, () => console.log('Listening on port ', port));
}

// add the code below
module.exports = { app, listen };