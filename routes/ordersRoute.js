const express = require("express")
const router = new express.Router()
const ordersController = require("../controllers/ordersController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")

router.get("/", utilities.checkLogin, ordersController.buildOrders)

router.get("/create", utilities.checkLogin, ordersController.buildCreateOrder)


router.post(
  "/create",
  utilities.checkLogin,
  validate.orderRules(),
  validate.checkOrderData,
  ordersController.createOrder
)


module.exports = router
