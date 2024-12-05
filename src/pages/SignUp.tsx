import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Please check your email to verify your account before signing in.",
      });
      
      navigate("/signin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-card w-full max-w-md space-y-6">
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
          <p className="text-muted-foreground">Start your creative journey today</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/signin")}>
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}