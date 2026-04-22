"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="bg-surface border border-border-soft rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-text-primary">Decoded 🤍</h1>
          <p className="text-sm text-text-secondary text-center">
            Entiende mejor a tu pareja según su ciclo.
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Continuar con Google
        </button>

      </div>
    </main>
  );
}