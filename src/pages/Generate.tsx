import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader, Download, ArrowLeft, Wand2, LayoutLandscape, LayoutPortrait } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GENERATION_SERVER = "http://localhost:3001";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageStyle, setImageStyle] = useState("realistic");
  const [orientation, setOrientation] = useState("landscape");
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
          imageStyle,
          orientation,
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
      
      <div className="space-y-6 animate-fade-in backdrop-blur-sm bg-card/30 p-8 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Art Style</label>
              <ToggleGroup 
                type="single" 
                value={imageStyle} 
                onValueChange={(value) => value && setImageStyle(value)} 
                className="justify-start gap-2"
              >
                <ToggleGroupItem 
                  value="realistic" 
                  aria-label="Realistic"
                  className="rounded-full data-[state=on]:bg-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  Realistic
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="artistic" 
                  aria-label="Artistic"
                  className="rounded-full data-[state=on]:bg-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  Artistic
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="anime" 
                  aria-label="Anime"
                  className="rounded-full data-[state=on]:bg-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  Anime
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image Orientation</label>
              <ToggleGroup 
                type="single" 
                value={orientation} 
                onValueChange={(value) => value && setOrientation(value)} 
                className="justify-start gap-2"
              >
                <ToggleGroupItem 
                  value="landscape" 
                  aria-label="Landscape"
                  className="rounded-full data-[state=on]:bg-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <LayoutLandscape className="h-4 w-4 mr-2" />
                  Landscape
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="portrait" 
                  aria-label="Portrait"
                  className="rounded-full data-[state=on]:bg-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <LayoutPortrait className="h-4 w-4 mr-2" />
                  Portrait
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-32 rounded-2xl transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 resize-none 
            backdrop-blur-sm bg-background/50 hover:bg-background/70"
        />
        <Button 
          onClick={handleGenerate} 
          className="w-full rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-primary/20
            active:scale-95 bg-gradient-to-r from-primary to-primary/80 hover:translate-y-[-2px]"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </div>

      {generatedImage && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-2xl font-semibold gradient-text">Generated Image</h2>
          <div className="rounded-3xl overflow-hidden border backdrop-blur-sm hover:shadow-2xl 
            transition-all duration-500 hover:-translate-y-2 group">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <Button
            onClick={handleDownload}
            className="w-full rounded-2xl transition-all duration-300 hover:shadow-lg 
              active:scale-95 border-2 backdrop-blur-sm hover:bg-primary/10"
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