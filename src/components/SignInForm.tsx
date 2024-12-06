import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface SignInFormProps {
  onSuccess: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: emailCheck } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      if (emailCheck) {
        toast({
          title: "Check your email",
          description: "We sent you a magic link to sign in.",
        });
        onSuccess();
      }
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
    <form onSubmit={handleSignIn} className="space-y-6 animate-fade-in delay-200">
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
      </div>
      
      <Button 
        type="submit" 
        className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        disabled={isLoading}
      >
        {isLoading ? "Sending Magic Link..." : "Sign In"}
      </Button>
    </form>
  );
}