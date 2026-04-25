"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-surface border border-border-soft rounded-[24px] p-10 w-full max-w-sm flex flex-col items-center">

        <div className="w-14 h-14 bg-primary-50 border border-primary-200 rounded-2xl flex items-center justify-center text-2xl mb-5">
          🤍
        </div>

        <h1 className="text-[22px] font-semibold text-text-primary tracking-tight mb-2">
          Decoded
        </h1>

        <p className="text-sm text-text-secondary text-center leading-relaxed mb-8 max-w-[200px]">
          Entiende mejor a tu pareja según su ciclo.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-primary-500 text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 text-[15px] tracking-tight mb-4"
        >
          <span className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-primary-500 text-[11px] font-bold flex-shrink-0">
            G
          </span>
          Continuar con Google
        </button>

        <p className="text-xs text-mauve text-center leading-relaxed">
          Al continuar, aceptas nuestros términos de uso.
        </p>

      </div>
    </main>
  );
}