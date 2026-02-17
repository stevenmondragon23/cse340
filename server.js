/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")
const utilities = require("./utilities/index")
const errorHandler = require("./utilities/errorHandler")
const session = require("express-session")
const pool = require('./database/')
const accountRoute = require("./routes/accountRoute")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const ordersRoute = require("./routes/ordersRoute")


/* ***********************
 * Middleware
 * ************************/
 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cookie Parser (Required for JWT)
app.use(cookieParser())

// Check JWT on every request
app.use(utilities.checkJWTToken)

/* ***********************
 * View Engine and Templates (Routes)
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
// STATIC FILE FIRST
app.use(express.static("public"))

app.use(static)
//Index route
app.get("/", baseController.buildHome)
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)
app.use("/orders", ordersRoute)
app.use("/",errorRoute)




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Error Handling Middleware
 *************************/
app.use(async (req, res) => {
  let nav = await utilities.getNav()

  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
    nav
  })
})

app.use(errorHandler)





/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})


