const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const version = process.env.npm_package_version

function listen(port) {
    app.listen(port, () => console.log(version ,' Listening on port ', port));
}

// add the code below
module.exports = { version, app, listen };