import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual auth
    toast({
      title: "Success!",
      description: "Signed in successfully",
    });
    navigate("/plans");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-card w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue generating amazing images</p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/signup")}>
            Don't have an account? Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}