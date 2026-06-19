"use client";

import { PawPrint } from "lucide-react";

export default function AuthLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 shadow-lg shadow-orange-500/20">
        <PawPrint className="h-10 w-10 text-white" />
      </div>

      <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-900">
        Pet<span className="text-orange-500">Finder</span>
      </h1>
    </div>
  );
}