import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Sparkles, Crown, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    features: [
      "5 images per day",
      "Basic image styles",
      "Standard resolution",
      "Community support"
    ],
    buttonText: "Get Started",
    popular: false,
    icon: Sparkles
  },
  {
    name: "Premium",
    price: "₹40",
    period: "/month",
    alternatePrice: "or ₹400/year",
    features: [
      "Unlimited images",
      "All image styles",
      "High resolution",
      "Priority support",
      "Custom aspect ratios",
      "Advanced editing tools"
    ],
    buttonText: "Go Premium",
    popular: true,
    icon: Crown
  }
];

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    alt: "AI Generated Whale",
    caption: "Realistic Nature"
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "AI Generated Art",
    caption: "Digital Art"
  },
  {
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "AI Generated Portrait",
    caption: "Portrait Style"
  }
];

export default function Plans() {
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string) => {
    if (planName === "Premium") {
      toast({
        title: "Processing Payment",
        description: "Redirecting to payment gateway...",
      });
      setTimeout(() => {
        toast({
          title: "Demo Mode",
          description: "This is a demo. In a real app, payment processing would occur here.",
        });
        navigate("/signin");
      }, 2000);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0 hover:bg-background/80 transition-all duration-300 rounded-full hover:scale-110 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-center flex-1 space-y-4">
            <h1 className="text-4xl font-bold gradient-text animate-fade-in">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Select the perfect plan for your creative needs. Transform your ideas into stunning visuals.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`p-8 relative backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-all duration-300 
                  hover:shadow-2xl hover:-translate-y-1 rounded-3xl border-2 
                  ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground 
                    px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                    Most Popular
                  </span>
                )}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold gradient-text">{plan.price}<span className="text-lg">{plan.period}</span></p>
                      {plan.alternatePrice && (
                        <p className="text-sm text-muted-foreground mt-1">{plan.alternatePrice}</p>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 group">
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full transition-all duration-300 active:scale-95 
                      ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl' : 
                      'hover:bg-primary/10'}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold gradient-text">Example Generations</h2>
            <p className="text-muted-foreground mt-2">
              Discover what you can create with our AI image generation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {exampleImages.map((image) => (
              <div key={image.alt} className="space-y-3 group">
                <div className="overflow-hidden rounded-3xl border backdrop-blur-sm 
                  hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 
                      group-hover:scale-105"
                  />
                </div>
                <p className="text-center font-medium">{image.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4 pb-8">
          <p className="text-muted-foreground">
            All plans include access to our basic features. Upgrade anytime to unlock premium capabilities.
          </p>
          <Button variant="link" onClick={() => navigate("/")} className="hover:text-primary transition-colors">
            Learn more about our features
          </Button>
        </div>
      </div>
    </div>
  );
}
