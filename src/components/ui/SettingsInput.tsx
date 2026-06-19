interface Props {
  placeholder: string;
}

export default function SettingsInput({ placeholder }: Props) {
  return <input className="flex w-full items-center justify-between rounded-3xl border border-zinc-200 bg-white p-4" placeholder={placeholder} />;
}
