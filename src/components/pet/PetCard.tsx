"use client";

import {
  AlertTriangle,
  Cat,
  Dog,
  MapPin,
  Phone,
  Share2,
  Clock3,
} from "lucide-react";
import PetStatusBadge from "./PetStatusBadge";

interface PetCardProps {
  name: string;
  species: "dog" | "cat";
  breed: string;
  distance: string;
  timeAgo: string;
  location: string;
  status: "lost" | "found";
  onClick: () => void;
}

export default function PetCard({
  name,
  species,
  breed,
  distance,
  timeAgo,
  location,
  status,
  onClick,
}: PetCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      <div className="flex">
        <div className="flex h-32 w-28 items-center justify-center bg-orange-50">
          {species === "dog" ? (
            <Dog className="h-12 w-12 text-orange-300" />
          ) : (
            <Cat className="h-12 w-12 text-orange-300" />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-zinc-900">{name}</h3>

              <PetStatusBadge status={status} />
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <MapPin size={14} />
              <span>
                {location} · {distance}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
              <Clock3 size={14} />
              <span>
                {timeAgo} · {breed}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white">
              {status === "lost" ? (
                <>
                  <AlertTriangle size={16} />
                  Vi esta mascota
                </>
              ) : (
                <>
                  <Phone size={16} />
                  Contactar dueño
                </>
              )}
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}