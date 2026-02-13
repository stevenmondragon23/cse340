const express = require("express")
const router = new express.Router()

const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

// Login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process login
router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)

//  Account Management (Protected)
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement)
)

//  Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})

//  Update Account View
router.get(
  "/update",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount)
)

//  Process Account Update
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.accountUpdateRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

//  Process Password Update
router.post(
  "/update-password",
  utilities.checkLogin,
  regValidate.passwordRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router
