
import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  prompt: string;
  size: string;
  imageUrl: string;
  createdAt: Date;
}

const ImageSchema: Schema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"],
    default: "1024x1024",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IImage>("Image", ImageSchema);
