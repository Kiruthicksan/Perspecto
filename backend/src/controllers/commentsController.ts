import type { Request, Response } from "express";
import Comment from "../models/commentModel.js";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || typeof blog !== "string" || blog.trim().length === 0) {
      res.status(400).json({
        message: "Blog ID is required and must be a non-empty string.",
      });
      return;
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({
        message: "Name is required and must be a non-empty string.",
      });
      return;
    }

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      res.status(400).json({
        message: "Content is required and must be a non-empty string.",
      });
      return;
    }
    const comment = await Comment.create({
      blog,
      name,
      content,
    });
    res.status(201).json({ message: "Comment Added sucessfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.body;
    const comment = await Comment.find({ blog: blogId, isApproved: true }).sort(
      { createdAt: -1 }
    );

    res.status(200).json({ message: "Comments fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};
