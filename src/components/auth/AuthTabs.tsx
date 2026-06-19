interface Props {
  mode: "login" | "register";
  onChange: (mode: "login" | "register") => void;
}

export default function AuthTabs({
  mode,
  onChange,
}: Props) {
  return (
    <div className="flex rounded-2xl bg-zinc-100 p-1">
      <button
        onClick={() => onChange("login")}
        className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
          mode === "login"
            ? "bg-white shadow-sm"
            : "text-zinc-500"
        }`}
      >
        Iniciar sesión
      </button>

      <button
        onClick={() => onChange("register")}
        className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
          mode === "register"
            ? "bg-white shadow-sm"
            : "text-zinc-500"
        }`}
      >
        Registrarse
      </button>
    </div>
  );
}