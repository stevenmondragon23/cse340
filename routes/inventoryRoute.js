// Needed Resources
const express = require("express")
const router = new express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")

const classificationValidate = require("../utilities/classification-validation")
const inventoryValidate = require("../utilities/inventory-validation")

// Inventory by classification (PUBLIC)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Inventory detail (PUBLIC)
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryById)
)

//  Management view (PROTECTED)
router.get(
  "/",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildManagement)
)

//  Add classification (GET) (PROTECTED)
router.get(
  "/add-classification",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddClassification)
)

//  Add classification (POST) (PROTECTED)
router.post(
  "/add-classification",
  utilities.checkEmployeeOrAdmin,
  classificationValidate.classificationRules(),
  classificationValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

//  Add inventory (GET) (PROTECTED)
router.get(
  "/add-inventory",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddInventory)
)

// Add inventory (POST) (PROTECTED)
router.post(
  "/add-inventory",
  utilities.checkEmployeeOrAdmin,
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router
