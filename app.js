const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const pollsRouter = require('./routes/user/polls');
const votesRouter = require('./routes/user/votes');
const authsRouter = require('./routes/user/auths');

const app = express();
const uri = "mongodb+srv://piyush:piyush12345@cluster0.vaf21.mongodb.net/poll";

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, PUT, PATCH, GET");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect(uri, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
  useCreateIndex: "true"
});

mongoose.connection.on("error", err => {
  console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
});

app.use('/poll', pollsRouter);
app.use('/vote', votesRouter);
app.use('/account', authsRouter);

module.exports = app;

