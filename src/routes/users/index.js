import { Router } from "express";
import userController from "../../controllers/users";
import errorHandlerAsync from "../../middlewares/errorHandler";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

router.get(
  "/",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(userController.getAll)
);

export default router;
