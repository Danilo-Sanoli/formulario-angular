var express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;
