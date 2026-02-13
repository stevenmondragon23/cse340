const { body, validationResult } = require("express-validator")

const validate = {}

/* ******************************
 * Registration Validation Rules
 * ***************************** */
validate.registrationRules = () => {
  return [
    body("account_firstname")
      .trim()
      .notEmpty()
      .withMessage("First name is required."),

    body("account_lastname")
      .trim()
      .notEmpty()
      .withMessage("Last name is required."),

    body("account_email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required."),

    body("account_password")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Password must be at least 12 characters.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[!@#$%^&*]/)
      .withMessage("Password must contain a special character.")
  ]
}

/* ******************************
 * Account Update Rules
 ****************************** */
validate.accountUpdateRules = () => {
  return [
    body("account_firstname")
      .trim()
      .notEmpty()
      .withMessage("First name is required."),

    body("account_lastname")
      .trim()
      .notEmpty()
      .withMessage("Last name is required."),

    body("account_email")
      .isEmail()
      .withMessage("A valid email is required.")
  ]
}

/* ******************************
 * Password Update Rules
 ****************************** */
validate.passwordRules = () => {
  return [
    body("account_password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain a capital letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number.")
  ]
}

/* ******************************
 * Check Validation Data
 ****************************** */
validate.checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("account/update-account", {
      title: "Update Account",
      nav: await require("../utilities").getNav(),
      errors,
      accountData: req.body,
    })
  }
  next()
}











/* ******************************
 * Check Registration Data
 * ***************************** */
validate.checkRegData = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.render("account/register", {
      title: "Registration",
      errors,
    })
  }
  next()
}

module.exports = validate
