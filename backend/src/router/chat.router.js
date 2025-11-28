// routes/chat.routes.js
import { Router } from "express";
import { verifyUser } from "../middleware/auth-middleware.js";
import { getChatHistory, getContactList } from "../controller.js/chat.controller.js";
//import { getContactList, getChatHistory } from "../controller/chat.controller.js";

const router = Router();
router.use(verifyUser);

router.get("/contacts", getContactList);
router.get("/:friendId", getChatHistory);

export default router;