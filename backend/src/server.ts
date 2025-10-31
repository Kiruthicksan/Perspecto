import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/db.js"
dotenv.config()
import postRoutes from "./routes/postRoutes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))



const port = process.env.PORT

app.use("/posts", postRoutes)

const startServer = async () => {
    try {
        await connectDb()
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
    } catch (error) {
        console.error("Failed to start server")
    }
}

startServer()

