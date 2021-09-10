import { Router } from "express";

import {
  getUser,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
} from "./controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
