// load our app server using express

require("@babel/register")({

  "plugins": [

      [
          "@babel/plugin-proposal-decorators",
          {
              "legacy": true
          }
      ],
  ],
})

const express = require('express')
const http = require('http');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('./config/config.json')
const usersRoutes = require('./api/routes/users');
const hallsRoutes = require('./api/routes/halls');
mongoose.connect(
  config.dataBaseUrl,
  { useNewUrlParser: true }, (err) => {
    if (!err) { console.log(`Database connected and host is ${config.dataBaseUrl}`) }
    else { console.log(err) }
  }
);
var app = express();

app.use(express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`app listens on port ${port}`));

// disable cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use('/users', usersRoutes);
app.use('/halls', hallsRoutes);

// handle error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


module.exports = app;