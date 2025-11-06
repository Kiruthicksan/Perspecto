import express from "express"
import { createPost, deletePost, getAllPost, getPost, getPostById, tooglePublish } from "../controllers/postController.js"
import upload from "../middlewares/multer.js"



const router = express.Router()



router.post("/",upload.single("image"), createPost)
router.get("/", getPost)
router.get("/admin", getAllPost)
router.get("/:slug", getPostById)
router.delete("/:id" , deletePost)
router.patch("/publish", tooglePublish)



export default router