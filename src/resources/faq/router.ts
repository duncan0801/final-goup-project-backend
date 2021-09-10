import { Router } from "express";
import { getAllFaqs } from "./controller";

const router = Router();

router.get("/", getAllFaqs);

export default router;
