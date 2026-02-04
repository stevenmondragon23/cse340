// Needed Resources
const express = require("express")
const router = new express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")

const classificationValidate = require("../utilities/classification-validation")
const inventoryValidate = require("../utilities/inventory-validation")

// Inventory by classification
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Inventory detail
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryById)
)

// Management view
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// Add classification (GET)
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Add classification (POST)
router.post(
  "/add-classification",
  classificationValidate.classificationRules(),
  classificationValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add inventory (GET)
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// Add inventory (POST)
router.post(
  "/add-inventory",
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router
