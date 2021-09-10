import { Router } from "express";
import {
  getCounsellors,
  getById,
  addCounsellor,
  updateCounsellor,
} from "./controller";

const router = Router();

router.get("/", getCounsellors);
router.get("/:id", getById);
router.post("/", addCounsellor);
router.patch("/:id", updateCounsellor);

export default router;
