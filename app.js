// load our app server using express

 const express = require('express')
 const app = express()
 const morgan = require('morgan');
 const bodyParser = require("body-parser");
 const mongoose = require('mongoose');

 const usersRoutes = require('./api/routes/users');
 const hallsRoutes = require('./api/routes/halls');

 
 mongoose.connect(
  //  "mongodb+srv://GroomAndBride:" + process.env.MONGO_ATLAS_PW + "@cluster0-jwktt.mongodb.net/test?retryWrites=true",
  "mongodb+srv://GroomAndBride:123123123@groomandbridecluster-jwktt.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }, (err) => {
      if (!err) { console.log('Database connected')}
      else { console.log('errorrrrrrrrrrrrr '+err)}
    }
);
app.use(express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use((err , req, res, next) => {
   res.status(err.status || 500);
   res.json({
      error: {
        message: err.message
      }
   });
});


module.exports = app;