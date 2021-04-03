const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();


//Middleware
app.use(express.json()); //Top at middleware


//Routers
app.use('/', require('./routes/userRoute'));
app.use('/post', require('./routes/postRoute'));

//MongoDB Connection
mongoose.connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on('connected', () => {
    console.log("Connected With DB");
});
mongoose.connection.on('error', (err) => {
    console.log("Errot Occured while Connecting with DB : " + err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Nistagram Started');
});