import { Router } from "express";
import { getAllServices } from "./controller";

const router = Router();

router.get("/", getAllServices);

export default router;
