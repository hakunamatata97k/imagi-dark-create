
import { Request, Response } from "express";
import OpenAI from "openai";
import ImageModel from "../models/image";

// Initialize OpenAI with API key
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req: Request, res: Response) => {
  try {
    const { prompt, size = "1024x1024", n = 1 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          message: "Prompt is required",
        },
      });
    }

    // Generate image using OpenAI API
    const response = await openaiClient.images.generate({
      prompt,
      n,
      size,
      response_format: "url",
    });

    // Save to database
    const newImage = new ImageModel({
      prompt,
      size,
      imageUrl: response.data[0].url,
    });
    await newImage.save();

    // Return the image data
    return res.status(200).json(response);
  } catch (error: any) {
    console.error("Error generating image:", error);
    
    // Format OpenAI API errors nicely
    if (error.response) {
      return res.status(error.response.status).json({
        error: {
          message: error.response.data.error.message || "OpenAI API error",
          type: error.response.data.error.type,
          code: error.response.data.error.code,
        },
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: {
        message: error.message || "Failed to generate image",
      },
    });
  }
};
