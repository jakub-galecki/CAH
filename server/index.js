const express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    apiRouter = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./models/User');

app.use('/api/', apiRouter);


const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log('Listening on port: ' + server.address().port);
});
