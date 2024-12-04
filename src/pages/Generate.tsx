import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GENERATION_SERVER = "http://localhost:3001"; // Your local server address

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageSize, setImageSize] = useState("landscape");
  const [imageType, setImageType] = useState("realistic");
  const navigate = useNavigate();

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
    try {
      const response = await fetch(`${GENERATION_SERVER}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageType,
          imageSize,
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

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-4xl font-bold gradient-text text-center flex-1">Text to Image</h1>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Image Size</label>
            <ToggleGroup type="single" value={imageSize} onValueChange={(value) => value && setImageSize(value)} className="justify-start">
              <ToggleGroupItem value="landscape" aria-label="Landscape">
                Landscape
              </ToggleGroupItem>
              <ToggleGroupItem value="portrait" aria-label="Portrait">
                Portrait
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image Style</label>
            <ToggleGroup type="single" value={imageType} onValueChange={(value) => value && setImageType(value)} className="justify-start">
              <ToggleGroupItem value="realistic" aria-label="Realistic">
                Realistic
              </ToggleGroupItem>
              <ToggleGroupItem value="artistic" aria-label="Artistic">
                Artistic
              </ToggleGroupItem>
              <ToggleGroupItem value="anime" aria-label="Anime">
                Anime
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

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
          <Button
            onClick={handleDownload}
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
}
