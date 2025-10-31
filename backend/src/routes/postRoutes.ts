import express from "express"
import { createPost, getPost, getPostById } from "../controllers/postController.js"

const router = express.Router()

router.post("/", createPost)
router.get("/", getPost)
router.get("/:slug", getPostById)

export default router