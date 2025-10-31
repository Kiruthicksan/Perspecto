import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import connectDb from "./config/db.js"
import postRoutes from "./routes/postRoutes.js"
import AdminLoginRoutes from "./routes/AdminLoginRoutes.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({origin : "http://localhost:5173"}))



const port = process.env.PORT

app.use("/posts", postRoutes)
app.use("/auth", AdminLoginRoutes)

const startServer = async () => {
    try {
        await connectDb()
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
    } catch (error) {
        console.error("Failed to start server")
    }
}

startServer()

