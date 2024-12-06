import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "@/components/SignInForm";
import { AuthHeader } from "@/components/AuthHeader";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background/80 to-muted/50">
      <div className="auth-card w-full max-w-md space-y-8 animate-fade-in">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 rounded-full hover:scale-110 transition-all duration-300 hover:bg-background/80"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <AuthHeader 
          title="Welcome Back"
          subtitle="Sign in to continue your creative journey"
        />

        <SignInForm onSuccess={() => navigate("/")} />

        <div className="text-center animate-fade-in delay-300">
          <Button 
            variant="link" 
            onClick={() => navigate("/signup")}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}