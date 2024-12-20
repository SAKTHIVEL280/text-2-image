import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setShowOtpInput: (show: boolean) => void;
}

export function SignUpForm({ 
  email, 
  setEmail, 
  isLoading, 
  setIsLoading, 
  setShowOtpInput 
}: SignUpFormProps) {
  const [password, setPassword] = useState("");

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm_method: 'otp'
          }
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (data?.user) {
        toast({
          title: "Check your email",
          description: "We've sent you a verification code.",
        });
        setShowOtpInput(true);
      }
    } catch (error: any) {
      console.error('Detailed signup error:', error);
      
      // Handle network errors specifically
      if (error.message === 'Failed to fetch') {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Unable to connect to the authentication service. Please check your internet connection and try again.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to create account. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}