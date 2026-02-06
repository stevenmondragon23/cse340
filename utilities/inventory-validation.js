const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

validate.inventoryRules = () => {
  return [
    body("classification_id")
      .notEmpty()
      .withMessage("Classification is required."),
    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Make is required."),
    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Model is required."),
    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Image path is required."),
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Thumbnail path is required."),
    body("inv_price")
      .notEmpty()
      .withMessage("Price is required.")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_year")
      .notEmpty()
      .withMessage("Year is required.")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Year must be valid."),
    body("inv_miles")
      .notEmpty()
      .withMessage("Miles is required.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer."),
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Color is required."),
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList(req.body.classification_id)
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: errors.array(),
      message: null,
      ...req.body, // sticky form: mantiene los datos ingresados
    })
    return
  }
  next()
}

module.exports = validate
