import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDb from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import AdminLoginRoutes from "./routes/AdminLoginRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const port = process.env.PORT;

app.use("/blogs", postRoutes);
app.use("/admin", AdminLoginRoutes);
app.use("/blogs", commentRoutes);



const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("Failed to start server");
  }
};

startServer();
