const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require('connect-flash')
const passport = require('passport')
const mongoose = require('mongoose')


//Mongoose onnect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://nero:fifa2009@ds016068.mlab.com:16068/sportsblog').then(()=>{
  console.log("connected to database")
}).catch((err)=>{
  console.log("Not Connected to Database ERROR! ", err)
})

const db = mongoose.connection;

const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
// Port
const port = process.env.PORT || 3001;
// init app
const app = express();


// Import Routes
const index = require("./routes/index");
const articles = require("./routes/articles");
const manage = require("./routes/manage");
const categories = require("./routes/categories");
const register = require("./routes/register")
const login = require("./routes/login")
const logout = require("./routes/logout")

// View Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Moment(date formatter)
app.locals.moment = require('moment')

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Express seession
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}))

//init passport
app.use(passport.initialize())
app.use(passport.session())
// Express messages
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);
app.use("/articles", articles);
app.use("/categories", categories);
app.use("/manage", manage);
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
