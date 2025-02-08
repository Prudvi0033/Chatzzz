import expresss from "express"
import { protectRoute } from "../lib/protectRoute.js"
import { getMessages, getUsers, sendMessage } from "../controllers/msg.controller.js"

const router = expresss.Router()

router.get("/users", protectRoute, getUsers)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id",protectRoute,sendMessage)

export default router