const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodayParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodayParser.json());
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if( process.env.NODE_ENV === ' production'){
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up index.html if it doesn't reconizie the route
  const path = require('path');
  app.get('*', (req. res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//clientid: 1009571969294-gmhmvti6o650reikvmahub491f441974.apps.googleusercontent.com
//client secret: dv7S2KrbAHKyqxtMaWU5immr

/*app.get('/', (req, res) =>{
  res.send({bye: 'buddy'});
});


*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
