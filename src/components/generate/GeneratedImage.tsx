import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface GeneratedImageProps {
  imageUrl: string;
}

export default function GeneratedImage({ imageUrl }: GeneratedImageProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
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
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold gradient-text">Generated Image</h2>
      <div className="rounded-3xl overflow-hidden border backdrop-blur-sm hover:shadow-2xl 
        transition-all duration-500 hover:-translate-y-2 group">
        <img 
          src={imageUrl} 
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
  );
}