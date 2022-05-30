const express = require('express');
const cors = require('cors');
const session  = require ('express-session');
const flash = require('connect-flash');
const passport = require('passport')
require('./config/passport')

const app = express();
// settings
app.set('port', process.env.PORT || 5000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    //store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes

app.use('/api/users',require('./routes/users.routes'))
app.use(require('./routes/users.routes'))


//global

app.use((req,res,next)=>{
  res.locals.sucess_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error= req.flash('error');
  res.locals.user = req.user || null;
   next();

});





module.exports = app;