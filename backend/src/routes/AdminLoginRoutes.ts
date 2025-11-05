import express from "express"
import { adminLogin, getDashboard, getUser } from "../controllers/adminLoginController.js"
import protect from "../middlewares/authMiddleware.js"


const router = express.Router()

router.post("/login" , adminLogin)
router.get("/profile",protect, getUser)
router.get("/dashboard" ,protect, getDashboard)

export default router