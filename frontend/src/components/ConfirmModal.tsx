"use client";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  title,
  description,
  confirmLabel = "Eliminar",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-4 mb-6 sm:mb-0 bg-surface rounded-[24px] p-6 flex flex-col gap-5 shadow-xl">
        <div className="flex flex-col gap-2">
          <h2 className="text-[17px] font-semibold text-text-primary tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full bg-error text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50 text-[15px] tracking-tight"
          >
            {loading ? "Eliminando..." : confirmLabel}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full bg-primary-50 border border-primary-200 text-primary-800 font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50 text-[15px] tracking-tight"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}