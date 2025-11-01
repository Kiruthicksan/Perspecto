import {  type Request, type Response } from "express";
import { Post } from "../models/postModel.js";
import fs from "fs"
import imageKit from "../config/imagekit.js";


export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse( req.body.blog)
    const imageFile = req.file
     

    // --------------------- Validation -----------------------
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res
        .status(400)
        .json({ message: "Title is required and must be a non-empty string." });
      return;
    }

    if (
      !subTitle ||
      typeof subTitle !== "string" ||
      subTitle.trim().length === 0
    ) {
      res
        .status(400)
        .json({
          message: "SubTitle is required and must be a non-empty string.",
        });
      return;
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      res
        .status(400)
        .json({
          message: "Description is required and must be a non-empty string.",
        });
      return;
    }

    if (
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      res
        .status(400)
        .json({
          message: "Category is required and must be a non-empty string.",
        });
      return;
    }

   

    if (typeof isPublished !== "boolean") {
      res.status(400).json({ message: "isPublished must be a boolean value." });
      return;
    }

    if(!imageFile){
      res.json(400).json({message : "Image is Required"})
      return
    }

    const fileBuffer = fs.readFileSync(imageFile.path)

    // ------------------------uploading image to imagekit logic----------------------
    const response = await imageKit.upload({
      file : fileBuffer,
      fileName : imageFile.originalname,
      folder : "/blogs"
    })

    // ---------------this is to optimize imagekit url transformation------------

    const imageUrl = imageKit.url({
      path : response.filePath,
      transformation : [
        {quality : "auto"},  // to auto compression
        {format : "webp"}, // to web format
        {width : "1280"} 
      ]
    })

    const image = imageUrl

    // --------------------- Create Post -----------------------
    const newPost = await Post.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Something went wrong",
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

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug });
    if (!post) {
      res.status(404).json({ message: "Post not found " });
    }

    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {}
};
