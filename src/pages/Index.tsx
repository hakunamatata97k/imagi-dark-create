
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import PromptForm from "@/components/PromptForm";
import GeneratedImage from "@/components/GeneratedImage";
import ImageSkeleton from "@/components/ImageSkeleton";
import { generateImage, ImageGenerationRequest } from "@/services/api";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (data: ImageGenerationRequest) => {
    try {
      setIsGenerating(true);
      setCurrentPrompt(data.prompt);
      
      const response = await generateImage(data);
      
      if (response.data && response.data.length > 0) {
        setImageUrl(response.data[0].url);
        toast.success("Image generated successfully!");
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container max-w-5xl min-h-screen py-8">
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <Card className="bg-muted/30 border-muted">
          <CardContent className="p-6">
            <PromptForm onSubmit={handleSubmit} isLoading={isGenerating} />
          </CardContent>
        </Card>
        
        <div>
          {isGenerating ? (
            <ImageSkeleton />
          ) : (
            <GeneratedImage imageUrl={imageUrl} prompt={currentPrompt} />
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Using OpenAI's DALL-E model to generate images</p>
      </footer>
    </div>
  );
};

export default Index;
