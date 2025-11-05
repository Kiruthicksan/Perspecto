import express from "express"
import { adminLogin, getDashboard, getUser, logout } from "../controllers/adminLoginController.js"
import protect from "../middlewares/authMiddleware.js"


const router = express.Router()

router.post("/login" , adminLogin)
router.get("/profile",protect, getUser)
router.get("/dashboard" , getDashboard)
router.post('/logout', logout)

export default router