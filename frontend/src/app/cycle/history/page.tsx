"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import ConfirmModal from "@/components/ConfirmModal";
import { PHASE_LABELS } from "@/lib/cycles"


interface CycleEntry {
  id: string;
  startDate: string;
  cycleLength: number;
  currentPhase: string;
  createdAt: string;
}

export default function CycleHistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
        const partner = userData.user.partners?.[0];

        if (!partner) {
          router.push("/partner/new");
          return;
        }

        setPartnerId(partner.id);
        setPartnerName(partner.name);

        const cycleData = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cycles/${partner.id}/history`
        );
        setEntries(cycleData.entries);
      } catch {
        setError("No se pudo cargar el historial.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    setDeleting(true);
    try {
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cycles/${selectedId}`,
        { method: "DELETE" }
      );
      setEntries((prev) => prev.filter((e) => e.id !== selectedId));
      setSelectedId(null);
    } catch {
      setError("Ocurrió un error al eliminar el ciclo. Intenta de nuevo.");
      setSelectedId(null);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loadingData) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary text-sm">Cargando historial...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title="Historial de ciclos" />

      <section className="p-4 flex flex-col gap-3">
        {error && <p className="text-error text-sm text-center">{error}</p>}

        {entries.length === 0 ? (
          <div className="bg-surface border border-border-soft rounded-[18px] p-6 flex flex-col items-center gap-4 text-center mt-4">
            <p className="text-3xl">🌙</p>
            <p className="text-sm font-medium text-text-primary">
              No hay ciclos registrados
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Registra el primer ciclo de {partnerName} para empezar a hacer seguimiento.
            </p>
            <button
              onClick={() => router.push("/cycle/new")}
              className="w-full bg-primary-500 text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform text-[15px] tracking-tight"
            >
              Registrar ciclo
            </button>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-surface border border-border-soft rounded-[18px] overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    {index === 0 && (
                      <span className="text-xs font-medium text-primary-500 mb-1">
                        Ciclo actual
                      </span>
                    )}
                    <p className="text-[15px] font-semibold text-text-primary tracking-tight capitalize">
                      {PHASE_LABELS[entry.currentPhase] ?? entry.currentPhase}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Inicio: {formatDate(entry.startDate)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Duración: {entry.cycleLength} días
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedId(entry.id)}
                    className="text-xs font-medium text-error bg-error/5 border border-error/20 px-3 py-1.5 rounded-full active:scale-95 transition-transform flex-shrink-0"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {selectedId && (
        <ConfirmModal
          title="¿Eliminar este ciclo?"
          description="Esta acción no se puede deshacer. El ciclo se eliminará permanentemente."
          confirmLabel="Sí, eliminar ciclo"
          onConfirm={handleDelete}
          onCancel={() => setSelectedId(null)}
          loading={deleting}
        />
      )}
    </main>
  );
}