"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import PartnerForm, { PartnerFormData } from "@/components/PartnerForm";
import PageHeader from "@/components/PageHeader";

export default function EditPartnerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");
    const [partnerId, setPartnerId] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<PartnerFormData | null>(null);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
                const partner = data.user.partners?.[0];

                if (!partner) {
                    router.push("/partner/new");
                    return;
                }

                setPartnerId(partner.id);
                setInitialData({
                    name: partner.name,
                    age: String(partner.age),
                    notes: partner.notes ?? "",
                    likes: partner.likes ?? [],
                    dislikes: partner.dislikes ?? [],
                });
            } catch {
                setError("No se pudo cargar el perfil.");
            } finally {
                setLoadingData(false);
            }
        };

        fetchPartner();
    }, []);

    const handleSubmit = async (data: PartnerFormData) => {
        if (!partnerId) return;
        setLoading(true);
        setError("");
        try {
            const response = await fetchWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/api/partners/${partnerId}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        ...data,
                        age: parseInt(data.age),
                    }),
                }
            );

            if (response.error) {
                setError(response.error);
                return;
            }

            router.push("/");
        } catch {
            setError("Ocurrió un error al actualizar el perfil. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-text-secondary text-sm">Cargando perfil...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <PageHeader title="Editar perfil" />
            {initialData && (
                <PartnerForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    submitLabel="Guardar cambios"
                />
            )}
        </main>
    );
}