import { Router } from "express";

import api from "./api";
import auth from "./auth";
import users from "./users";
import products from "./product";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);
router.use(api);

export default router;
