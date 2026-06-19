import { ChevronRight, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { TargetPage } from '../screens/ProfileScreen';

interface Props {
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  setPage: (page: TargetPage) => void;
  targetPage: TargetPage;
}

export default function (item: Props) {
  const Icon = item.icon;

  return (
    <button key={item.title} className="flex w-full items-center justify-between rounded-3xl border border-zinc-200 bg-white p-4"
    onClick={()=>item.setPage(item.targetPage)}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100">
          <Icon size={18} />
        </div>
        <span className="font-medium">{item.title}</span>
      </div>

      <ChevronRight size={18} className="text-zinc-400" />
    </button>
  );
}
