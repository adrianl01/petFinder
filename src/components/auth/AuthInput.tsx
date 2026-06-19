interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({ label, name, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-zinc-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        {...props}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}