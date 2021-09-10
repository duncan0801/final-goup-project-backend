import { Router } from "express";
import { getAllReviews, addReview } from "./controller";

const router = Router();

router.get("/", getAllReviews);
router.post("/", addReview);

export default router;
