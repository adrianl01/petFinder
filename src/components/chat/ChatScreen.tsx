"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Dog,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
}

interface ChatScreenProps {
  petName?: string;
  contactName?: string;
  onBack?: () => void;
}

export default function ChatScreen({
  petName = "Rocky",
  contactName = "María González",
  onBack,
}: ChatScreenProps) {
  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: "1",
        sender: "other",
        text: "Hola. Gracias por comunicarte por Rocky.",
        time: "14:05",
      },
      {
        id: "2",
        sender: "other",
        text: "¿Lo viste recientemente?",
        time: "14:05",
      },
      {
        id: "3",
        sender: "me",
        text: "Sí, creo haberlo visto cerca de la plaza.",
        time: "14:06",
      },
    ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
    ]);

    setMessage("");
  };

  return (
    <main className="flex h-screen flex-col bg-[#FBF9F7]">
      {/* HEADER */}

      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0E8]">
              <Dog
                size={22}
                className="text-[#E8521A]"
              />
            </div>

            <div>
              <h1 className="font-extrabold text-[#1A1A18]">
                {contactName}
              </h1>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs text-[#706F6B]">
                  Reporte de {petName}
                </span>
              </div>
            </div>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10">
            <Phone size={18} />
          </button>
        </div>
      </header>

      {/* ALERTA */}

      <div className="border-b border-[#FAD4BC] bg-[#FDF0E8] px-4 py-3">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <ShieldCheck
            size={16}
            className="text-[#E8521A]"
          />

          <p className="text-xs font-bold text-[#712B13]">
            Compartí únicamente información
            relevante para encontrar la mascota.
          </p>
        </div>
      </div>

      {/* CHAT */}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-md flex-col gap-3 px-4 py-5">
          <div className="self-center rounded-full bg-white px-4 py-2 text-xs font-bold text-[#706F6B]">
            Hoy
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[85%] ${
                msg.sender === "me"
                  ? "self-end"
                  : "self-start"
              }`}
            >
              <div
                className={`rounded-3xl px-4 py-3 ${
                  msg.sender === "me"
                    ? "bg-[#E8521A] text-white"
                    : "border border-black/10 bg-white text-[#1A1A18]"
                }`}
              >
                <p className="text-sm leading-relaxed">
                  {msg.text}
                </p>
              </div>

              <p
                className={`mt-1 px-2 text-xs ${
                  msg.sender === "me"
                    ? "text-right text-[#706F6B]"
                    : "text-[#706F6B]"
                }`}
              >
                {msg.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT */}

      <div className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-md p-4">
          <div className="flex items-center gap-2">
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleSend()
              }
              placeholder="Escribí un mensaje..."
              className="flex-1 rounded-2xl border border-black/10 bg-[#FBF9F7] px-4 py-3 outline-none focus:border-[#E8521A]"
            />

            <button
              onClick={handleSend}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8521A] text-white transition hover:bg-[#D14917]"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}