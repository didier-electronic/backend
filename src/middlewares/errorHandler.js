import errorHandler from "../helpers/errorHandler";

const errorHandlerAsync = (controller) => async (req, res, next) => {
  try {
    const result = await controller(req, res, next);
    return result;
  } catch (err) {
    const error = errorHandler(err);
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(error.code).json({
      status: error.code,
      message: error.message,
      errors: error.errors,
    });
  }
};

export default errorHandlerAsync;
