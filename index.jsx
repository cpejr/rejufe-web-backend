const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const routes  = require('./src/routes.jsx')
const app = express();

// const MONGO_URL = 'mongodb+srv://admin:Sirius123%40@cluster0.jtyc0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://admin:Sirius123%40@cluster0.jtyc0.mongodb.net/Rejufe?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('MongoDB Conectado com sucesso')
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

app.listen(3003, function () {
    console.log('Servidor iniciou com sucesso')
});
