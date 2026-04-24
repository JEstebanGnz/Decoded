"use client";

import { useSession, signOut } from "next-auth/react";

export default function AppHeader() {

        const { data: session, status } = useSession();

        if (status === "unauthenticated" || status === "loading") return null;

        return (
            <header className="bg-surface border-b border-border-soft px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-text-primary">Decoded 🤍</h1>
                <div className="flex items-center gap-3">
                    <p className="text-sm text-text-secondary">
                        Hola, {session?.user?.name?.split(" ")[0]}
                    </p>
<button
  onClick={() => signOut({ callbackUrl: "/login" })}
  className="text-xs font-medium text-primary-800 bg-primary-50 border border-primary-200 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
>
  Salir
</button>
                </div>
            </header>
        );
}