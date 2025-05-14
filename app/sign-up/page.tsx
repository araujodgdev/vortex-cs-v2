"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </div>
      
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Vortex CS</h1>
        </Link>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Crie sua conta na plataforma de Customer Success</p>
      </div>
      
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              card: "bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700",
              headerTitle: "text-2xl font-bold text-slate-900 dark:text-white",
              headerSubtitle: "text-slate-600 dark:text-slate-400",
              formFieldLabel: "text-slate-700 dark:text-slate-300",
              formFieldInput: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg",
              footerActionLink: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
            },
          }}
          /* O redirecionamento agora é gerenciado pelo middleware com base nas roles */
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}