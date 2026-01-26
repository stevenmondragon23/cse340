const errorController = {}

errorController.throwError = async (req, res, next) => {
  try {
    // Intentional error
    throw new Error("Intentional 500 error for testing purposes")
  } catch (err) {
    next(err)
  }
}

module.exports = errorController