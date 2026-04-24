"use client";

import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState("");

const addTag = () => {
  const trimmed = input.trim().replace(",", "");
  if (trimmed && !tags.includes(trimmed)) {
    onChange([...tags, trimmed]);
    setInput("");
  }
};

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addTag();
  }
};

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-primary">{label}</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Escribe y presiona enter"}
          className="flex-1 border border-border-soft rounded-xl px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={addTag}
          className="bg-primary-500 text-white px-4 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
        >
          +
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-50 border border-primary-200 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-primary-500 font-bold leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}