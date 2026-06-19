"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Filter,
  MapPin,
  MessageCircle,
  PawPrint,
} from "lucide-react";

type NotificationType =
  | "lost"
  | "found"
  | "message";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  group: "Hoy" | "Ayer" | "Esta semana";
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "lost",
    title: "Mascota perdida cerca tuyo",
    description:
      "Rocky fue reportado a 300 metros de tu ubicación.",
    time: "Hace 15 min",
    group: "Hoy",
    unread: true,
  },
  {
    id: "2",
    type: "message",
    title: "Nuevo mensaje",
    description:
      "María González respondió tu mensaje.",
    time: "Hace 40 min",
    group: "Hoy",
    unread: true,
  },
  {
    id: "3",
    type: "found",
    title: "Mascota encontrada",
    description:
      "Luna fue encontrada y reunida con su familia.",
    time: "Hace 3 horas",
    group: "Hoy",
    unread: false,
  },
  {
    id: "4",
    type: "lost",
    title: "Nueva alerta en tu zona",
    description:
      "Se reportó un gato perdido cerca de Palermo.",
    time: "Ayer",
    group: "Ayer",
    unread: false,
  },
  {
    id: "5",
    type: "message",
    title: "Conversación actualizada",
    description:
      "Recibiste nuevos mensajes sobre Rocky.",
    time: "Hace 2 días",
    group: "Esta semana",
    unread: false,
  },
];

function NotificationIcon({
  type,
}: {
  type: NotificationType;
}) {
  switch (type) {
    case "lost":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0E8]">
          <PawPrint
            size={22}
            className="text-[#E8521A]"
          />
        </div>
      );

    case "found":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F5EE]">
          <CheckCircle2
            size={22}
            className="text-[#0F7B5F]"
          />
        </div>
      );

    case "message":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
          <MessageCircle
            size={22}
            className="text-blue-600"
          />
        </div>
      );
  }
}

function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <button className="w-full rounded-3xl border border-black/10 bg-white p-4 text-left transition hover:border-black/20">
      <div className="flex gap-3">
        <NotificationIcon
          type={notification.type}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-[#1A1A18]">
              {notification.title}
            </h3>

            {notification.unread && (
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#E8521A]" />
            )}
          </div>

          <p className="mt-1 text-sm text-[#706F6B]">
            {notification.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#706F6B]">
              {notification.time}
            </span>

            <ChevronRight
              size={16}
              className="text-[#706F6B]"
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function NotificationList() {
  const [filter, setFilter] =
    useState<
      "all" | "lost" | "found" | "message"
    >("all");

  const notifications = useMemo(() => {
    if (filter === "all")
      return MOCK_NOTIFICATIONS;

    return MOCK_NOTIFICATIONS.filter(
      (n) => n.type === filter
    );
  }, [filter]);

  const groups = ["Hoy", "Ayer", "Esta semana"];

  return (
    <main className="min-h-screen bg-[#FBF9F7]">
      {/* HEADER */}

      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-md px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0E8]">
              <Bell
                size={22}
                className="text-[#E8521A]"
              />
            </div>

            <div>
              <h1 className="text-xl font-black text-[#1A1A18]">
                Notificaciones
              </h1>

              <p className="text-sm text-[#706F6B]">
                Alertas y actividad reciente
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* FILTROS */}

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-md gap-2 overflow-x-auto px-5 py-4">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === "all"
                ? "bg-[#E8521A] text-white"
                : "bg-[#F5F5F5]"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setFilter("lost")}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === "lost"
                ? "bg-[#E8521A] text-white"
                : "bg-[#F5F5F5]"
            }`}
          >
            Perdidos
          </button>

          <button
            onClick={() => setFilter("found")}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === "found"
                ? "bg-[#0F7B5F] text-white"
                : "bg-[#F5F5F5]"
            }`}
          >
            Encontrados
          </button>

          <button
            onClick={() =>
              setFilter("message")
            }
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === "message"
                ? "bg-blue-600 text-white"
                : "bg-[#F5F5F5]"
            }`}
          >
            Mensajes
          </button>
        </div>
      </section>

      {/* ALERTA */}

      <div className="border-b border-[#FAD4BC] bg-[#FDF0E8] px-5 py-3">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <MapPin
            size={16}
            className="text-[#E8521A]"
          />

          <p className="text-xs font-bold text-[#712B13]">
            Recibiendo alertas dentro de un
            radio de 2 km.
          </p>
        </div>
      </div>

      {/* LISTA */}

      <section className="mx-auto max-w-md px-5 py-5">
        {groups.map((group) => {
          const items = notifications.filter(
            (n) => n.group === group
          );

          if (!items.length) return null;

          return (
            <div
              key={group}
              className="mb-8"
            >
              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-[#706F6B]">
                {group}
              </h2>

              <div className="space-y-3">
                {items.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* FOOTER STATS */}

      <div className="sticky bottom-0 border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">
          <span className="text-sm font-bold text-[#706F6B]">
            {
              notifications.filter(
                (n) => n.unread
              ).length
            }{" "}
            sin leer
          </span>

          <button className="flex items-center gap-2 rounded-xl bg-[#E8521A] px-4 py-2 font-bold text-white">
            <Filter size={16} />
            Administrar alertas
          </button>
        </div>
      </div>
    </main>
  );
}