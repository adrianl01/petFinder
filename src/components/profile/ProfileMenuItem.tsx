import { ChevronRight, LucideIcon } from 'lucide-react';
import { TargetPage } from '../screens/ProfileScreen';

interface Props {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'orange' | 'emerald' | 'red';
  targetPage?: TargetPage;
  setPage?: (page: TargetPage) => void;
}

export default function ProfileMenuItem({ title, subtitle, icon: Icon, color = 'orange', targetPage, setPage }: Props) {
  const colors = {
    orange: {
      wrapper: 'bg-orange-100',
      icon: 'text-orange-600'
    },
    emerald: {
      wrapper: 'bg-emerald-100',
      icon: 'text-emerald-600'
    },
    red: {
      wrapper: 'bg-red-100',
      icon: 'text-red-600'
    }
  };

  return (
    <button
      className="flex w-full items-center justify-between rounded-3xl border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-300"
      onClick={() => {
        if (targetPage && setPage) {
          setPage(targetPage);
        }
      }}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[color].wrapper}`}>
          <Icon size={20} className={colors[color].icon} />
        </div>

        <div>
          <p className="font-bold text-zinc-900">{title}</p>

          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
        </div>
      </div>

      <ChevronRight size={18} className="text-zinc-400" />
    </button>
  );
}
