const express = require('express'),
    http = require('http'),
    mongoose = require('mongoose');

const app = express();

app.use(express.json());


const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log('Listening on port: ' + server.address().port);
});