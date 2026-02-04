const { body, validationResult } = require("express-validator")
const utilities = require(".")

exports.inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_year")
      .isInt({ min: 1900 })
      .withMessage("Valid year required."),
    body("inv_price")
      .isFloat()
      .withMessage("Valid price required."),
    body("inv_miles")
      .isInt()
      .withMessage("Miles must be a number."),
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Color is required."),
    body("classification_id")
      .isInt()
      .withMessage("Classification is required."),
  ]
}

exports.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const classificationList = await utilities.buildClassificationList(
      req.body.classification_id
    )

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      errors: errors.array(),
      classificationList,
      ...req.body,
    })
  }
  next()
}

validate.inventoryRules = () => {
  return [
    body("classification_id").notEmpty(),
    body("inv_make").trim().notEmpty(),
    body("inv_model").trim().notEmpty(),
    body("inv_description").trim().notEmpty(),
    body("inv_image").trim().notEmpty(),
    body("inv_thumbnail").trim().notEmpty(),
    body("inv_price").isNumeric(),
    body("inv_year").isInt({ min: 1900 }),
    body("inv_miles").isInt({ min: 0 }),
    body("inv_color").trim().notEmpty()
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classifications = await require("../models/inventory-model")
      .getClassifications()

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: classifications.rows,
      errors: errors.array(),
      ...req.body
    })
    return
  }
  next()
}

module.exports = validate