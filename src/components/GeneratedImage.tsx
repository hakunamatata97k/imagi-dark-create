
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface GeneratedImageProps {
  imageUrl: string | null;
  prompt: string;
}

export default function GeneratedImage({ imageUrl, prompt }: GeneratedImageProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      setLoading(true);
      
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      
      // Generate filename from prompt
      const promptWords = prompt.trim().split(/\s+/);
      const firstFourWords = promptWords.slice(0, 4).join("-").toLowerCase();
      const timestamp = Date.now();
      const filename = `${firstFourWords}-${timestamp}.png`;
      
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Failed to download image");
    } finally {
      setLoading(false);
    }
  };

  if (!imageUrl) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-muted/30">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Your generated image will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0 relative group">
        <img 
          src={imageUrl} 
          alt={prompt}
          className="w-full h-auto object-cover"
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
          <Button 
            onClick={handleDownload} 
            variant="secondary" 
            size="sm"
            disabled={loading}
            className="glass-morphism"
          >
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
