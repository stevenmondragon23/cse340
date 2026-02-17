const pool = require("../database/")

/* ***************************
 * Create new order
 * ************************** */
async function createOrder(account_id) {
  try {
    const sql = `
      INSERT INTO public.orders (account_id)
      VALUES ($1)
      RETURNING order_id
    `
    const result = await pool.query(sql, [account_id])
    return result.rows[0]
  } catch (error) {
    console.error("createOrder error " + error)
  }
}

/* ***************************
 * Add item to order
 * ************************** */
async function addItemToOrder(order_id, inv_id, quantity, price) {
  try {
    const sql = `
      INSERT INTO public.order_items 
      (order_id, inv_id, quantity, item_price)
      VALUES ($1, $2, $3, $4)
    `
    return await pool.query(sql, [order_id, inv_id, quantity, price])
  } catch (error) {
    console.error("addItemToOrder error " + error)
  }
}

/* ***************************
 * Get orders by account
 * ************************** */
async function getOrdersByAccount(account_id) {
  try {
    const sql = `
      SELECT 
        o.order_id,
        o.order_date,
        i.inv_make,
        i.inv_model,
        oi.quantity,
        oi.item_price
      FROM public.orders o
      JOIN public.order_items oi ON o.order_id = oi.order_id
      JOIN public.inventory i ON oi.inv_id = i.inv_id
      WHERE o.account_id = $1
      ORDER BY o.order_date DESC
    `
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getOrdersByAccount error " + error)
  }
}

/* ***************************
 * Get all orders (Admin/Employee)
 * ************************** */
async function getAllOrders() {
  try {
    const sql = `
      SELECT 
        o.order_id,
        o.order_date,
        a.account_firstname,
        a.account_lastname,
        i.inv_make,
        i.inv_model,
        oi.quantity,
        oi.item_price
      FROM public.orders o
      JOIN public.account a ON o.account_id = a.account_id
      JOIN public.order_items oi ON o.order_id = oi.order_id
      JOIN public.inventory i ON oi.inv_id = i.inv_id
      ORDER BY o.order_date DESC
    `
    const result = await pool.query(sql)
    return result.rows
  } catch (error) {
    console.error("getAllOrders error " + error)
  }
}

module.exports = {
  createOrder,
  addItemToOrder,
  getOrdersByAccount,
  getAllOrders
}
