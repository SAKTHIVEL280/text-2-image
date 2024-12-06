import { ReactNode } from "react";

interface AuthHeaderProps {
  title: string;
  subtitle: ReactNode;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 animate-fade-in">
        {title}
      </h1>
      <p className="text-muted-foreground animate-fade-in delay-100">
        {subtitle}
      </p>
    </div>
  );
}