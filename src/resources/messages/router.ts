import { Router } from "express";
import {
	getMessagesByUserId,
	addMessage,
	getMessagesByConversationId,
    deleteMessage
} from "./controller";
const router = Router();

router.get("/:id", getMessagesByUserId);
router.get("/conversation/:id", getMessagesByConversationId);
router.post("/", addMessage);
router.delete("/:id", deleteMessage)

export default router;
