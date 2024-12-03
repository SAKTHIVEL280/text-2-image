import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // TODO: Implement actual generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedImage("https://picsum.photos/800/600");
    setIsGenerating(false);
    
    toast({
      title: "Success!",
      description: "Image generated successfully",
    });
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold gradient-text text-center">Text to Image</h1>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-32"
        />
        <Button 
          onClick={handleGenerate} 
          className="w-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Image"
          )}
        </Button>
      </div>

      {generatedImage && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Generated Image</h2>
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}