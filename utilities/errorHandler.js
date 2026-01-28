const utilities = require("./index")

async function errorHandler(err, req, res, next) {
  console.error(err.stack)

  const nav = await utilities.getNav()

  res.status(err.status || 500).render("errors/error", {
    title: "Server Error",
    message: err.message || "Something went wrong.",
    nav
  })
}

module.exports = errorHandler
