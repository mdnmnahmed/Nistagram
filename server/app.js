const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000;


//MongoDB Connection
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

mongoose.connect(MONGOURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on('connected', () => {
    console.log("Connected With DB");
});
mongoose.connection.on('error', (err) => {
    console.log("Errot Occured while Connecting with DB : " + err);
});


//Registering Model
require('./models/userModel');
require('./models/postModel');


//Middleware
app.use(express.json()); //Top at middleware
    
//Routers
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


app.listen(PORT, () => {
    console.log('Nistagram Started');
});