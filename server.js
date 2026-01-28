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
