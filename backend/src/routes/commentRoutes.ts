import express from "express"
import { addComment, getComments } from "../controllers/commentsController.js"



const router = express.Router()

router.post("/comment" , addComment)
router.get("/comments" , getComments)

export default router