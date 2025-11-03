import type { Request, Response } from "express";
import { genrateToken } from "../utils/generateToken.js";
import { setAuthCookie } from "../utils/setAuthCookie.js";
import { Post } from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      res
        .status(400)
        .json({ message: "Email is Required and it must be non empyt String" });
      return;
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      res.status(400).json({
        message: "Password is Required and it must be not empty string",
      });
      return;
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const token = genrateToken(email);
    setAuthCookie(token, req, res);

    res
      .status(200)
      .json({ messsage: "Loggedin Successfully", user: { email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

// ------------- admin dasboard endpoint ------------------------------

export const getDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recentBlogs = await Post.find({}).sort({ createdAt: -1 }).limit(5);
    const blogCount = await Post.countDocuments();
    const comments = await Comment.countDocuments();
    const draft = await Post.countDocuments({ isPublished: true });

    res.status(200).json({
      message: "Dashboard Data fetched successfully",
      recentBlogs,
      blogCount,
      comments,
      draft,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};
