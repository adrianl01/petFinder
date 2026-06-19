interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}