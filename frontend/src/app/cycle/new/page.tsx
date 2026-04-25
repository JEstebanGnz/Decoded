"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import PageHeader from "@/components/PageHeader";


export default function NewCyclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    startDate: "",
    cycleLength: "28",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.startDate) return;
    setLoading(true);
    setError("");
    try {
      const userData = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
      const partnerId = userData.user.partners[0]?.id;

      if (!partnerId) {
        setError("No hay un perfil creado aún.");
        return;
      }

      const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/cycles`, {
        method: "POST",
        body: JSON.stringify({
          partnerId,
          startDate: new Date(form.startDate).toISOString(),
          cycleLength: parseInt(form.cycleLength),
        }),
      });

      if (data.error) {
        setError(data.error);
        return;
      }

      router.push("/");
    } catch (error) {
      setError("Ocurrió un error al registrar el ciclo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title="Nuevo ciclo" />

      <section className="p-4 flex flex-col gap-4">
        <div className="bg-surface border border-border-soft rounded-2xl p-4 flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">
              ¿Cuándo empezó el último ciclo?
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">
              Duración del ciclo (días)
            </label>
            <input
              type="number"
              name="cycleLength"
              value={form.cycleLength}
              onChange={handleChange}
              min="21"
              max="35"
              className="border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500"
            />
            <p className="text-xs text-text-secondary">
              El ciclo promedio dura 28 días. Ajusta si conoces la duración exacta.
            </p>
          </div>

        </div>

        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !form.startDate}
          className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Registrar ciclo"}
        </button>

      </section>
    </main>
  );
}