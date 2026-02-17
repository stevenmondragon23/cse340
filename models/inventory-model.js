const pool = require("../database/index.js")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
}

/* ***************************
 *  Get inventory items by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    throw error
  }
}

/* ***************************
 *  Get inventory item by inv_id
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * 
       FROM public.inventory 
       WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error:", error)
    throw error
  }
}

/* ***************************
 *  Add new classification
 * ************************** */
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    const data = await pool.query(sql, [classification_name])
    return data.rows[0]
  } catch (error) {
    console.error("addClassification error:", error)
    throw error
  }
}

/* ***************************
 *  Add new inventory item
 * ************************** */
async function addInventory(data) {
  try {
    const sql = `
      INSERT INTO inventory (
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `
    const params = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_year,
      data.inv_miles,
      data.inv_color
    ]

    const result = await pool.query(sql, params)
    return result.rows[0]
  } catch (error) {
    console.error("addInventory error:", error)
    throw error
  }
}

/* ***************************
 * Get all inventory
 * ************************** */
async function getInventory() {
  try {
    const sql = `
      SELECT inv_id, inv_make, inv_model, inv_price
      FROM public.inventory
      ORDER BY inv_make
    `
    const result = await pool.query(sql)
    return result.rows
  } catch (error) {
    console.error("getInventory error " + error)
  }
}





module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
  addClassification,
  addInventory,
  getInventory
}
