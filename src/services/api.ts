
import { toast } from "sonner";

export interface ImageGenerationRequest {
  prompt: string;
  size: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  n?: number;
}

export interface ImageGenerationResponse {
  created: number;
  data: {
    url: string;
  }[];
}

export interface ApiError {
  error: {
    message: string;
    type?: string;
    code?: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const generateImage = async (params: ImageGenerationRequest): Promise<ImageGenerationResponse> => {
  try {
    const response = await fetch(`${API_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    return data as ImageGenerationResponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error(message);
    throw error;
  }
};
