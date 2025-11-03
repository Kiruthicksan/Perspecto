import express from "express"
import { adminLogin, getDashboard } from "../controllers/adminLoginController.js"


const router = express.Router()

router.post("/login" , adminLogin)
router.get("/dashboard" , getDashboard)

export default router