import { Router } from "express";
import ProductController from "../../controllers/products";
// import joiValidator from "../../middlewares/joiValidator";
// import * as schema from "../../helpers/validation/joi-schemas";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyToken from "../../middlewares/verifyToken";
import errorHandlerAsync from "../../middlewares/errorHandler";
import upload from "../../helpers/multer";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("productImage"),
  errorHandlerAsync(ProductController.create)
);

router.get("/:id", errorHandlerAsync(ProductController.getOne));
router.get("/", errorHandlerAsync(ProductController.getAll));
router.put(
  "/:id",
  verifyToken,
  upload.single("productImage"),
  errorHandlerAsync(ProductController.update)
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(ProductController.delete)
);

export default router;
