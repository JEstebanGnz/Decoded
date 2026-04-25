"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [partner, setPartner] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<{ title: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
        if (data.user.partners && data.user.partners.length > 0) {
          setPartner(data.user.partners[0]);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const handleGetRecommendation = async () => {
    if (!partner?.id) return;
    setLoading(true);
    try {
      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recommendations/${partner?.id}`
      );
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error al obtener recomendación:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary text-sm">Cargando...</p>
      </main>
    );
  }

  if (!partner?.id) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-surface border border-border-soft rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4 text-center">
          <p className="text-4xl">🤍</p>
          <h2 className="text-lg font-semibold text-text-primary tracking-tight">
            Aún no hay ningún perfil
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Crea el perfil de tu pareja para empezar a recibir recomendaciones personalizadas.
          </p>
          <button
            onClick={() => router.push("/partner/new")}
            className="w-full bg-primary-500 text-white font-semibold py-3 rounded-2xl active:scale-95 transition-transform text-sm"
          >
            Crear perfil
          </button>
        </div>
      </main>
    );
  }

  const latestEntry = partner.cycleEntries?.[0];

  return (
    <main className="min-h-screen bg-background">
      <section className="p-4 flex flex-col gap-3">

        {/* Card de fase */}
        <div className="bg-surface border border-border-soft rounded-[18px] overflow-hidden">
          <div className="p-5">
            <p className="text-sm text-text-secondary mb-1">Fase de {partner.name}</p>
            {latestEntry ? (
              <>
                <h2 className="text-3xl font-semibold text-primary-500 tracking-tight leading-none capitalize">
                  {latestEntry.currentPhase}
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Día {latestEntry.dayOfCycle} · Ciclo de {latestEntry.cycleLength} días
                </p>
              </>
            ) : (
              <p className="text-sm text-text-secondary mt-1">
                Aún no hay ciclo registrado.
              </p>
            )}
          </div>
          <div className="border-t border-primary-200 bg-primary-50 px-5 py-3 flex justify-between items-center">
            {latestEntry ? (
              <p className="text-xs text-mauve">Ciclo activo</p>
            ) : (
              <button
                onClick={() => router.push("/cycle/new")}
                className="text-xs font-medium text-primary-800"
              >
                Registrar ciclo →
              </button>
            )}
            <button
              onClick={() => router.push("/partner/edit")}
              className="text-xs font-medium text-primary-800 bg-surface border border-primary-200 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              Editar perfil
            </button>
          </div>
        </div>

        {/* Card de recomendaciones */}
        <div className="bg-surface border border-border-soft rounded-[18px] p-5">
          <p className="text-sm text-text-secondary mb-4">Recomendaciones de hoy</p>
          <button
            onClick={handleGetRecommendation}
            disabled={loading}
            className="w-full bg-primary-500 text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50 text-[15px] tracking-tight"
          >
            {loading ? "Generando..." : "Generar recomendaciones"}
          </button>

          {recommendations.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-primary-50 rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-primary-200 tracking-widest mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-semibold text-primary-800 text-sm">{rec.title}</p>
                  <p className="text-text-secondary text-sm mt-1 leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </main>
  );
}