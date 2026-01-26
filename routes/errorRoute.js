const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")

// Intentional error route
router.get("/trigger-error", errorController.throwError)

module.exports = router
