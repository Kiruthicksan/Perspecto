import type { Request, Response } from "express";
import Comment from "../models/commentModel.js";

// --------------------- endpoint for adding comments --------------

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

// ------------------- endpoint for geting comments which are specified to that specific blog and approved by admin --------------------------------

export const getBlogComments = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.body;
    const comment = await Comment.find({ blog: blogId, isApproved: true }).sort(
      { createdAt: -1 }
    );

    res.status(200).json({ message: "Comments fetched successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};

//  ----------------- endpoint for getting All comments(admin) ----------------------------

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.find()
      .sort({ createdAt: -1 })
      .populate("blog");

    res.status(200).json({ message: "Comments fetched successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};

//  -------------------------- endpoint for admin to approve comments ---------------------------

export const approveComments = async (req: Request, res: Response) :Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "Comment ID is required" });
      return
    }
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).json({ message: "comment not found" });
      return;
    }

    comment.isApproved = true;

    await comment.save();
    res.status(200).json({ message: "Message Approved", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};

// -------------- endpoint for admin to delete comments

export const deleteComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Message Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somehting went wrong",
      error: (error as Error).message,
    });
  }
};
