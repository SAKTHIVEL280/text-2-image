import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const exampleImages = [
    {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      description: "AI-Generated Robot",
    },
    {
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      description: "Digital Art",
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "Creative Visualization",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold gradient-text">T2I - Text 2 Image</h1>
        <p className="text-2xl text-muted-foreground">Transform your imagination into stunning visuals with the power of AI</p>
        
        <div className="space-y-4">
          <p className="text-xl">Create beautiful, unique images from your text descriptions</p>
          <ul className="text-lg space-y-2 text-muted-foreground">
            <li>✨ Advanced AI Image Generation</li>
            <li>🎨 Multiple Image Styles</li>
            <li>📏 Flexible Size Options</li>
            <li>💾 Easy Download & Share</li>
          </ul>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/signin")} size="lg">
            Get Started
          </Button>
          <Button onClick={() => navigate("/plans")} variant="outline" size="lg">
            View Plans
          </Button>
        </div>

        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold">Example Generations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exampleImages.map((image, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
                <p className="text-muted-foreground">{image.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}