import { User } from '@/src/types/user';
import Avatar from '../../ui/Avatar';

export default function ProfileContent(user: User) {
  const names = user?.fullName.split(' ');

  const initials = names[0][0] + names[names.length - 1][0];

  return (
    <section className="border-b border-zinc-200 bg-gradient-to-b from-orange-50 to-white p-5">
      <div className="mx-auto max-w-md px-5 py-10">
        <div className="flex flex-col items-center">
          <Avatar initials={initials.toUpperCase()} />

          <h1 className="mt-5 text-2xl font-black text-zinc-900">{user?.fullName}</h1>

          <p className="mt-1 text-zinc-500">{user?.email}</p>
        </div>
      </div>
    </section>
  );
}
