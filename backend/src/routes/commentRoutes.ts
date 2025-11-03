import express from "express"
import { addComment, approveComments, deleteComments, getAllComments, getBlogComments } from "../controllers/commentsController.js"



const router = express.Router()

router.post("/comment" , addComment)
router.get("/comments" , getBlogComments)
router.get("/admin/comments", getAllComments)
router.patch("/admin/comment", approveComments)
router.delete("/admin/comment", deleteComments)

export default router