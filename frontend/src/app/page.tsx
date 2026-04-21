"use client";

import { useState } from "react";

export default function Home() {
  const [recommendations, setRecommendations] = useState<{ title: string; description: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/recommendations/partner-test-001");
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error al obtener recomendación:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <header className="bg-surface border-b border-border-soft px-4 py-4">
        <h1 className="text-xl font-bold text-text-primary">Decoded 🤍</h1>
      </header>

      {/* Contenido principal */}
      <section className="p-4 flex flex-col gap-4">

        {/* Tarjeta de fase actual */}
        <div className="bg-surface border border-border-soft rounded-2xl p-4">
          <p className="text-sm text-text-secondary">Fase actual de Kathe</p>
          <h2 className="text-2xl font-bold text-primary-500 mt-1">Folicular</h2>
          <p className="text-sm text-text-secondary mt-2">
            Día 8 del ciclo — Mayor energía y apertura emocional.
          </p>
        </div>

        {/* Tarjeta de recomendaciones */}
        <div className="bg-surface border border-border-soft rounded-2xl p-4">
          <p className="text-sm text-text-secondary mb-3">Recomendaciones de hoy</p>
          <button
            onClick={handleGetRecommendation}
            disabled={loading}
            className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar recomendaciones"}
          </button>

          {recommendations.length > 0 && (
            <div className="mt-4 flex flex-col gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
                  <span className="text-4xl font-black text-primary-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-bold text-primary-800 text-base mt-1">{rec.title}</p>
                  <p className="text-text-secondary text-sm mt-2 leading-loose">{rec.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </main>
  );
}