const ordersModel = require("../models/orders-model")
const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities/")

/* ***************************
 * Build orders list view
 * ************************** */
async function buildOrders(req, res, next) {
  try {
    const nav = await utilities.getNav()
    const accountData = res.locals.accountData

    let data

    if (accountData.account_type === "Client") {
      data = await ordersModel.getOrdersByAccount(accountData.account_id)
    } else {
      data = await ordersModel.getAllOrders()
    }

    data = data.map(order => {
    order.order_date = utilities.formatDate(order.order_date)
    return order
    })


    res.render("orders/index", {
      title: "Orders",
      nav,
      orders: data,
      accountType: accountData.account_type,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build create order view
 * ************************** */
async function buildCreateOrder(req, res, next) {
  try {
    const nav = await utilities.getNav()
    const inventory = await inventoryModel.getInventory()

    res.render("orders/create", {
      title: "Create Order",
      nav,
      inventory,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Create order
 * ************************** */
async function createOrder(req, res, next) {
  try {
    const { inv_id, quantity } = req.body
    const account_id = res.locals.accountData.account_id

    const order = await ordersModel.createOrder(account_id)

    // Obtener precio actual del vehículo
    const item = await inventoryModel.getInventoryById(inv_id)

    await ordersModel.addItemToOrder(
      order.order_id,
      inv_id,
      quantity,
      item.inv_price
    )

    req.flash("notice", "Order created successfully.")
    res.redirect("/orders")
  } catch (error) {
    next(error)
  }
}

module.exports = {
  buildOrders,
  buildCreateOrder,
  createOrder
}
