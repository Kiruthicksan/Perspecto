// ------------ endpoint for genreate content with gemini -------------

import type { Request, Response } from "express";
import genrate from "../config/gemini.js";

export const generateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {prompt} = req.body
    const content = await genrate(prompt + " Genreate a blog content for this topic in simple text format") 
    res.status(200).json({message : 'Genreated', content})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Somethin went wrong",
      error: (error as Error).message,
    });
  }
}