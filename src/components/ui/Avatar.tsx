interface AvatarProps {
  initials: string;
}

export default function Avatar({
  initials,
}: AvatarProps) {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-3xl font-black text-white shadow-lg shadow-orange-500/20">
      {initials}
    </div>
  );
}