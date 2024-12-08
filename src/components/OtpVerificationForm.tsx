import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface OtpVerificationFormProps {
  email: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function OtpVerificationForm({ email, isLoading, setIsLoading }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

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
  );
}