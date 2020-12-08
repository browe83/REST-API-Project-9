// Handler function to wrap each route.
exports.asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    // Forward error to the global error handler
    next(error);
  }
};
