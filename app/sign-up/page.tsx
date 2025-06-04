"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </div>
      
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Vortex CS</h1>
        </Link>
        <p className="mt-2 text-muted-foreground">Crie sua conta na plataforma de Customer Success</p>
      </div>
      
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              card: "bg-card shadow-lg rounded-xl border border-border",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border border-border rounded-lg",
              footerActionLink: "text-primary hover:text-primary/90",
            },
          }}
          /* O redirecionamento agora é gerenciado pelo middleware com base nas roles */
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}