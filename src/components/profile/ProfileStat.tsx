interface ProfileStatProps {
  value: number;
  label: string;
}

export default function ProfileStat({
  value,
  label,
}: ProfileStatProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-black text-orange-500">
        {value}
      </p>

      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
    </div>
  );
}