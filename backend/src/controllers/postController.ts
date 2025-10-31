import type { Request, Response } from "express";
import { Post } from "../models/postModel.js";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, author, category, tags } = req.body;

    // --------------------- validation -----------------------

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res
        .status(400)
        .json({ message: "Title is required and must be a non-empty string." });
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

    if (!author || typeof author !== "string" || author.trim().length === 0) {
      res.status(400).json({
        message: "Author is required and must be a non-empty string.",
      });
      return;
    }

    if (
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      res.status(400).json({
        message: "Category is required and must be a non-empty string.",
      });
      return;
    }

    if (tags && !Array.isArray(tags)) {
      res.status(400).json({ message: "Tags must be an array of strings." });
      return;
    }

    const newPost = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
      tags,
    });
    res.status(201).json({ message: "Post created Successfully", newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somethin went wrong",
      error: (error as Error).message,
    });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.find();
    res.status(200).json({ message: "Post Fetched correctly", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somethin went wrong",
      error: (error as Error).message,
    });
  }
};

export const getPostById = async  (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug
    const post = await Post.findOne({slug})
    if(!post){
      res.status(404).json({message : "Post not found "})
    }

    res.status(200).json({message : "Post fetched successfully" ,post})
  } catch (error) {
    
  }
}