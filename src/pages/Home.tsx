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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-purple-900/20 to-muted 
      animate-gradient-xy backdrop-blur-sm">
      <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">
        <div className="space-y-4 hover-card p-8 rounded-3xl transition-all duration-700">
          <h1 className="text-6xl font-bold gradient-text animate-float">T2I - Text 2 Image</h1>
          <p className="text-2xl text-muted-foreground animate-fade-in delay-200">
            Transform your imagination into stunning visuals with the power of AI
          </p>
        </div>
        
        <div className="space-y-6 hover-card p-8 rounded-3xl transition-all duration-700">
          <p className="text-xl animate-fade-in delay-300">Create beautiful, unique images from your text descriptions</p>
          <ul className="text-lg space-y-3 text-muted-foreground">
            {[
              "✨ Advanced AI Image Generation",
              "🎨 Multiple Image Styles",
              "📏 Flexible Size Options",
              "💾 Easy Download & Share"
            ].map((feature, index) => (
              <li key={index} 
                className="transform hover:translate-x-2 transition-all duration-300 hover:text-primary 
                  animate-fade-in cursor-default"
                style={{ animationDelay: `${400 + index * 100}ms` }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "800ms" }}>
          <Button 
            onClick={() => navigate("/signin")} 
            size="lg"
            className="rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 
              bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
              shadow-lg hover:shadow-xl hover:shadow-primary/20">
            Get Started
          </Button>
          <Button 
            onClick={() => navigate("/plans")} 
            variant="outline" 
            size="lg"
            className="rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300
              backdrop-blur-sm hover:bg-primary/10 border-2">
            View Plans
          </Button>
        </div>

        <div className="mt-16 space-y-8 animate-fade-in" style={{ animationDelay: "900ms" }}>
          <h2 className="text-3xl font-bold gradient-text">Example Generations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exampleImages.map((image, index) => (
              <div key={index} className="group perspective-1000">
                <div className="space-y-2 transform transition-all duration-500 
                  hover:scale-105 hover:-rotate-2 hover:translate-z-10">
                  <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl 
                    transition-all duration-500 hover:shadow-primary/20">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-64 object-cover transform transition-transform duration-500 
                        group-hover:scale-110"
                    />
                  </div>
                  <p className="text-muted-foreground transition-colors duration-300 
                    group-hover:text-primary">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}