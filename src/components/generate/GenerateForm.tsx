import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Wand2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUserSubscription } from "@/hooks/useUserSubscription";

interface GenerateFormProps {
  onGenerate: (prompt: string, style: string) => Promise<void>;
  isGenerating: boolean;
}

export default function GenerateForm({ onGenerate, isGenerating }: GenerateFormProps) {
  const [prompt, setPrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("realistic");
  const { isPremium } = useUserSubscription();

  const handleGenerate = async () => {
    const stylePrefix = {
      realistic: "realistic photo of",
      artistic: "artistic painting of",
      anime: "anime style illustration of"
    }[imageStyle];

    const fullPrompt = `${stylePrefix} ${prompt}`;
    await onGenerate(fullPrompt, imageStyle);
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
        onClick={handleGenerate} 
        className="w-full rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-primary/20
          active:scale-95 bg-gradient-to-r from-primary to-primary/80 hover:translate-y-[-2px]"
        disabled={isGenerating || !prompt.trim()}
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
  );
}