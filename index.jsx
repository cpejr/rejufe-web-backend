require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const routes  = require('./src/routes.jsx')
const app = express();

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to bucket')
    }
})

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes)

// app.get('/', (req, res) => {
//     res.send.json({Message: 'OK'});
// });

// require('/controllers/authController')(app);

app.listen(3333, function () {
    console.log('Listening on port: 3333')
});
