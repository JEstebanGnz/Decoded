"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TagInput from "@/components/TagInput";
import { fetchWithAuth } from "@/lib/api";

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    notes: "",
  });
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.age) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/partners`, {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          likes,
          dislikes,
          notes: form.notes,
        }),
      });

      if (data.error) {
        setError(data.error);
        return;
      }

      router.push("/");
    } catch (error) {
      setError("Ocurrió un error al crear el perfil. Intenta de nuevo.");
      console.error("Error al crear partner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border-soft px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-text-secondary text-sm"
        >
          ← Volver
        </button>
        <h1 className="text-lg font-bold text-text-primary">Nuevo perfil</h1>
      </header>

      <section className="p-4 flex flex-col gap-4">

        <div className="bg-surface border border-border-soft rounded-2xl p-4 flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cómo se llama?"
              className="border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Edad</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="¿Cuántos años tiene?"
              className="border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500"
            />
          </div>

          <TagInput
            label="¿Qué le gusta?"
            tags={likes}
            onChange={setLikes}
            placeholder="ej: música, deporte..."
          />

          <TagInput
            label="¿Qué no le gusta?"
            tags={dislikes}
            onChange={setDislikes}
            placeholder="ej: ruido, multitudes..."
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">Notas adicionales</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Algo más que consideres relevante de tu pareja..."
              rows={3}
              className="border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500 resize-none"
            />
          </div>

        </div>

        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.age}
          className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Crear perfil"}
        </button>

      </section>
    </main>
  );
}