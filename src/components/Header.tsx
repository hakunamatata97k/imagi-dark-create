
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="pt-8 pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gradient">AI Image Generator</h1>
      <p className="mt-2 text-muted-foreground">
        Generate stunning images and logos using OpenAI's DALL-E model
      </p>
      {children}
    </header>
  );
}
