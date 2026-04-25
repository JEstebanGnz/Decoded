"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import PartnerForm, { PartnerFormData } from "@/components/PartnerForm";
import PageHeader from "@/components/PageHeader";


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
      <PageHeader title="Nuevo perfil" />
      <PartnerForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Crear perfil"
      />
    </main>
  );
}