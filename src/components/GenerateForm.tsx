import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface GenerateFormProps {
  onGenerate: (prompt: string, imageStyle: string, orientation: string) => void;
  isGenerating: boolean;
}

export function GenerateForm({ onGenerate, isGenerating }: GenerateFormProps) {
  const [prompt, setPrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("realistic");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const selectedPlan = localStorage.getItem('selectedPlan');
    setIsPremium(selectedPlan === 'Premium');
  }, []);

  const handleSubmit = () => {
    if (prompt.trim()) {
      const orientation = isPremium ? '1080x1080' : '512x512';
      onGenerate(prompt, imageStyle, orientation);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in backdrop-blur-sm bg-card/30 p-8 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300">
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
      </div>

      <Textarea
        placeholder="Describe the image you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="h-32 rounded-2xl transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 resize-none 
          backdrop-blur-sm bg-background/50 hover:bg-background/70"
      />
      
      <Button 
        onClick={handleSubmit} 
        className="w-full rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-primary/20
          active:scale-95 bg-gradient-to-r from-primary to-primary/80 hover:translate-y-[-2px]"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </div>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Image
          </>
        )}
      </Button>
    </div>
  );
}