"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import PartnerForm, { PartnerFormData } from "@/components/PartnerForm";

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: PartnerFormData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/partners`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          age: parseInt(data.age),
        }),
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      router.push("/");
    } catch {
      setError("Ocurrió un error al crear el perfil. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border-soft px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-text-secondary text-sm">
          ← Volver
        </button>
        <h1 className="text-lg font-bold text-text-primary">Nuevo perfil</h1>
      </header>
      <PartnerForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Crear perfil"
      />
    </main>
  );
}