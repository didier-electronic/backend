import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.send("Welcome to the Electronics E-commerce"));

export default router;
