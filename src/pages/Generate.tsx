import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GenerateForm from "@/components/generate/GenerateForm";
import GeneratedImage from "@/components/generate/GeneratedImage";
import { useUserSubscription } from "@/hooks/useUserSubscription";

const GENERATION_SERVER = "http://localhost:3001";

export default function Generate() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const navigate = useNavigate();
  const { isPremium } = useUserSubscription();

  const handleGenerate = async (prompt: string, imageStyle: string) => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`${GENERATION_SERVER}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageStyle,
          size: isPremium ? "1080x1080" : "512x512",
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedImage(`${GENERATION_SERVER}${data.imageUrl}`);
      
      toast({
        title: "Success!",
        description: "Image generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="shrink-0 hover:bg-background/80 transition-all duration-300 rounded-full hover:scale-110 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300">
            <Wand2 className="h-8 w-8 animate-pulse" />
            AI Image Generator
          </h1>
          <p className="text-muted-foreground">Transform your imagination into stunning visuals</p>
        </div>
      </div>
      
      <GenerateForm onGenerate={handleGenerate} isGenerating={isGenerating} />
      
      {generatedImage && <GeneratedImage imageUrl={generatedImage} />}
    </div>
  );
}