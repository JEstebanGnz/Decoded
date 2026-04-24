"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";

export default function Home() {
  const { data: session } = useSession();
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
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-4">
        <div className="bg-surface border border-border-soft rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4 text-center">
          <p className="text-4xl">🤍</p>
          <h2 className="text-lg font-bold text-text-primary">Aún no hay ningún perfil</h2>
          <p className="text-sm text-text-secondary">
            Crea el perfil de tu pareja para empezar a recibir recomendaciones personalizadas.
          </p>
          <button
            onClick={() => router.push("/partner/new")}
            className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform"
          >
            Crear perfil
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">

      <section className="p-4 flex flex-col gap-4">

        <div className="bg-surface border border-border-soft rounded-2xl p-4">
          <p className="text-sm text-text-secondary">Fase actual de {partner?.name}</p>
          {partner?.cycleEntries?.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-primary-500 mt-1 capitalize">
                {partner.cycleEntries[0].currentPhase}
              </h2>
              <p className="text-sm text-text-secondary mt-2">
                Ciclo de {partner.cycleEntries[0].cycleLength} días.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-text-secondary mt-2">
                Aún no hay ciclo registrado.
              </p>
              <button
                onClick={() => router.push("/cycle/new")}
                className="mt-3 w-full border border-primary-500 text-primary-500 font-semibold py-2 rounded-xl active:scale-95 transition-transform text-sm"
              >
                Registrar ciclo
              </button>
            </>
          )}
        </div>

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