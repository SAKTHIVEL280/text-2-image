import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a verification code.",
      });
      setShowOtpInput(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your account has been verified. You can now sign in.",
      });
      navigate("/signin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSignUp} className="space-y-6 animate-fade-in delay-200">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-6 animate-fade-in delay-200">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
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