import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SignUpForm } from "@/components/SignUpForm";
import { OtpVerificationForm } from "@/components/OtpVerificationForm";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          title="Create Account"
          subtitle="Start your creative journey today"
        />

        {!showOtpInput ? (
          <SignUpForm 
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setShowOtpInput={setShowOtpInput}
          />
        ) : (
          <OtpVerificationForm 
            email={email}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        <div className="text-center animate-fade-in delay-300">
          <Button 
            variant="link" 
            onClick={() => navigate("/signin")}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}