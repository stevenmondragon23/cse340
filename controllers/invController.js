const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  const nav = await utilities.getNav()
  const className = data[0].classification_name

  res.render("inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildInventoryById = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const vehicle = await invModel.getInventoryById(inv_id)
    const nav = await utilities.getNav()

    if (!vehicle) {
      const error = new Error("Vehicle not found")
      error.status = 404
      throw error
    }

    res.render("inventory/details", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build management view
 * ************************** */
invCont.buildManagement = async (req, res) => {
  const nav = await utilities.getNav()
  const message = req.session.message
  delete req.session.message

  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
    message,
  })
}

/* ***************************
 * Build add classification view
 * ************************** */
invCont.buildAddClassification = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 * Process add classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const nav = await utilities.getNav()
  const { classification_name } = req.body

  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.session.message = {
      type: "success",
      content: "Classification added successfully!",
    }
    res.redirect("/inv/")
  } else {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Failed to add classification." }],
    })
  }
}

/* ***************************
 * Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  const message = req.session.message
  delete req.session.message

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
    message,
  })
}

/* ***************************
 * Process add inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)
  const message = req.session.message
  delete req.session.message

  const result = await invModel.addInventory(req.body)

  if (result) {
    req.session.message = {
      type: "success",
      content: "Vehicle added successfully!",
    }
    res.redirect("/inv/")
  } else {
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: [{ msg: "Failed to add vehicle." }],
      message,
      ...req.body,
    })
  }
}

module.exports = invCont
