import express from "express"
import { checkAuth, editProfile, login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../lib/protectRoute.js"




const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/edit-profile",protectRoute,editProfile)
router.get("/check",protectRoute, checkAuth)

export default router