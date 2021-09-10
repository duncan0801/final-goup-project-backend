import { Router } from "express";

import {
  getUsersAppointments,
  updateAppointment,
  addAppointment,
  deleteAppointment,
} from "./controller";

const router = Router();

router.get("/:id", getUsersAppointments);
router.patch("/:id", updateAppointment);
router.post("/", addAppointment);
router.delete("/:id", deleteAppointment);

export default router;
