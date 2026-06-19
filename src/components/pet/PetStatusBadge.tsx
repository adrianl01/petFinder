interface PetStatusBadgeProps {
  status: "lost" | "found";
}

export default function PetStatusBadge({
  status,
}: PetStatusBadgeProps) {
  const styles = {
    lost: "bg-orange-100 text-orange-700",
    found: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status === "lost" ? "Perdido" : "Encontrado"}
    </span>
  );
}