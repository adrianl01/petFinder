"use client";

import { Cat, Dog } from "lucide-react";

interface Props {
  selected: string;
  onSelect: (value: string) => void;
}

export default function SpeciesSelector({
  selected,
  onSelect,
}: Props) {
  const base =
    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("dog")}
        className={`${base} ${
          selected === "dog"
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-zinc-200 bg-white"
        }`}
      >
        <Dog size={16} />
        Perro
      </button>

      <button
        type="button"
        onClick={() => onSelect("cat")}
        className={`${base} ${
          selected === "cat"
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-zinc-200 bg-white"
        }`}
      >
        <Cat size={16} />
        Gato
      </button>

      <button
        type="button"
        onClick={() => onSelect("other")}
        className={`${base} ${
          selected === "other"
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-zinc-200 bg-white"
        }`}
      >
        Otro
      </button>
    </div>
  );
}