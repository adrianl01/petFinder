"use client";

import {
  Bell,
  MapPin,
  PawPrint,
  Search,
  Plus,
} from "lucide-react";

import PetCard from "@/src/components/pet/PetCard";
import BottomNavigation from "@/src/components/layout/BottomNavigation";
import { useEffect, useState } from "react";
import ReportDetailsModal from "../report/reportDetailsModal";
import { getReportsNearMe } from "@/src/lib/api/reports";

import { ReportResponse } from "@/src/types/report";

export default function FeedScreen() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsData = await getReportsNearMe();
      setReports(reportsData);
    };

    fetchReports();
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 pb-24">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <PawPrint className="h-5 w-5 text-white" />
            </div>

            <h1 className="text-xl font-black">
              Pet<span className="text-orange-500">Finder</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200">
              <Search size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200">
              <Bell size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-orange-200 bg-orange-50">
        <div className="mx-auto flex max-w-md items-center gap-2 px-5 py-3 text-sm">
          <MapPin
            size={16}
            className="text-orange-500"
          />

          <span className="font-semibold text-orange-600">
            Palermo, CABA
          </span>

          <span className="text-zinc-500">
            · 2.4 km de radio
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-md p-5">
        <h2 className="mb-4 text-xl font-black">
          <span className="text-orange-500">12</span>{" "}
          mascotas perdidas cerca
        </h2>

        <div className="space-y-4">
          <PetCard
            name="Rocky"
            species="dog"
            breed="Pastor Alemán"
            distance="0.3 km"
            timeAgo="Hace 2 horas"
            location="Av. Santa Fe 3200"
            status="lost"
            onClick={() => setOpen(true)}
          />

          <PetCard
            name="Michi"
            species="cat"
            breed="Gato atigrado"
            distance="0.8 km"
            timeAgo="Hace 5 horas"
            location="Uriarte 1580"
            status="found"
            onClick={() => setOpen(true)}
          />

          <PetCard
            name="Luna"
            species="dog"
            breed="Labrador negra"
            distance="1.2 km"
            timeAgo="Hace 1 día"
            location="Thames 1100"
            status="lost"
            onClick={() => setOpen(true)}
          />
        </div>
      </section>

      <button className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
        <Plus size={24} />
      </button>

      <BottomNavigation />
    </main>
  );
}