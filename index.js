require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo');
const { errors } = require('celebrate');

const routes = require('./src/routes/index');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const app = express();

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to bucket')
    }
})

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECURE_KEY, // 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Deve ser definido como false em produção
        secure: false, // Deve ser definido como true em produção
        maxAge: 1000 * 60 * 60 * 8 // 8 horas
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    }),
  }));
app.use(routes)

app.use(errors());

app.listen(3333, function () {
    console.log('Listening on port: 3333')
});
