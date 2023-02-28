require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var Grid = require('gridfs-stream');
const session = require('express-session');
var MongoStore = require('connect-mongo');
const { errors } = require('celebrate');

const routes = require('./src/routes/index');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const app = express();

mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      gfs = Grid(mongoose.connection.db, mongoose.mongo);
      gfs.collection('uploads');
      console.log('Connected to bucket');
    }
  }
);

const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) app.set('trust proxy', 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECURE_KEY, //
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: isProduction, // Deve ser definido como false em produção
      secure: isProduction, // Deve ser definido como true em produção
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      sameSite: 'none',
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(errors());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}. isProduction=${isProduction}`)
);
