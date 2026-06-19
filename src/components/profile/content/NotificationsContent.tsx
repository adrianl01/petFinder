"use client";

import { Bell } from "lucide-react";

export default function NotificationsContent() {
  const notifications = [
    {
      id: 1,
      text: "Se encontró una mascota similar a Rocky cerca de tu zona.",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      text: "Nuevo reporte publicado a menos de 5 km de tu ubicación.",
      date: "Ayer",
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-black">
        Notificaciones
      </h2>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex gap-3 rounded-3xl border border-zinc-200 bg-white p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
            <Bell
              size={18}
              className="text-emerald-600"
            />
          </div>

          <div>
            <p className="text-sm font-medium">
              {notification.text}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {notification.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}