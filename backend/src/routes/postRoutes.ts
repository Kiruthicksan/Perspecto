import express from "express"
import { createPost, getPost, getPostById } from "../controllers/postController.js"
import upload from "../middlewares/multer.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/",upload.single("image"), protect, createPost)
router.get("/", getPost)
router.get("/:slug", getPostById)

export default router