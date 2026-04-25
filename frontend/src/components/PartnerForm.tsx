"use client";

import { useState } from "react";
import TagInput from "@/components/TagInput";

export interface PartnerFormData {
  name: string;
  age: string;
  notes: string;
  likes: string[];
  dislikes: string[];
}

interface PartnerFormProps {
  initialData?: PartnerFormData;
  onSubmit: (data: PartnerFormData) => Promise<void>;
  loading: boolean;
  error: string;
  submitLabel: string;
}

const DEFAULT_FORM: PartnerFormData = {
  name: "",
  age: "",
  notes: "",
  likes: [],
  dislikes: [],
};

const inputClass = "border border-border-soft rounded-2xl px-4 py-3 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500 transition-colors";
const labelClass = "text-sm font-medium text-text-primary";

export default function PartnerForm({
  initialData = DEFAULT_FORM,
  onSubmit,
  loading,
  error,
  submitLabel,
}: PartnerFormProps) {
  const [form, setForm] = useState<PartnerFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => onSubmit(form);

  const isDisabled = loading || !form.name || !form.age;

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="bg-surface border border-border-soft rounded-[18px] p-5 flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="¿Cómo se llama?"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Edad</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="¿Cuántos años tiene?"
            className={inputClass}
          />
        </div>

        <TagInput
          label="¿Qué le gusta?"
          tags={form.likes}
          onChange={(likes) => setForm({ ...form, likes })}
          placeholder="ej: música, deporte..."
        />

        <TagInput
          label="¿Qué no le gusta?"
          tags={form.dislikes}
          onChange={(dislikes) => setForm({ ...form, dislikes })}
          placeholder="ej: ruido, multitudes..."
        />

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Notas adicionales</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Algo más que consideres relevante de tu pareja..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

      </div>

      {error && <p className="text-error text-sm text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        className="w-full bg-primary-500 text-white font-semibold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50 text-[15px] tracking-tight"
      >
        {loading ? "Guardando..." : submitLabel}
      </button>
    </div>
  );
}