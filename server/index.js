const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api');

const uri = 'mongodb://127.0.0.1:27017/CAH';
mongoose.connect(uri, {useNewUrlParser: true}).catch((err) => console.error(err.reason));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./models/UserSchema');
app.use('/api/', apiRouter);


const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log('Listening on port: ' + server.address().port);
});
