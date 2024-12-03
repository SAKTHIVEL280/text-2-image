import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function Plans() {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string) => {
    // TODO: Implement actual subscription
    navigate("/generate");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold gradient-text mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="auth-card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Free Plan</h2>
          <p className="text-center text-muted-foreground">Perfect for trying out</p>
          <div className="text-3xl font-bold text-center">₹0</div>
          <ul className="space-y-2">
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 2 generations per day</li>
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Basic quality</li>
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Basic support</li>
          </ul>
          <Button onClick={() => handleSelectPlan("free")} className="w-full">
            Select Free Plan
          </Button>
        </div>
        <div className="auth-card p-6 space-y-4 border-primary">
          <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
            Popular
          </div>
          <h2 className="text-2xl font-bold text-center">Pro Creator</h2>
          <p className="text-center text-muted-foreground">For serious creators</p>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-center">₹40</div>
            <div className="text-center text-muted-foreground">per month</div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited generations</li>
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> High quality output</li>
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Advanced features</li>
          </ul>
          <Button onClick={() => handleSelectPlan("pro")} className="w-full">
            Select Pro Plan
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Or ₹400/year (Save 17%)
          </div>
        </div>
      </div>
    </div>
  );
}