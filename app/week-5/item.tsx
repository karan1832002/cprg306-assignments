type ItemProps = {
  name: string;
  quantity: number;
  category: string;
};

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm transition hover:border-slate-700 hover:bg-slate-900/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold capitalize">{name}</p>
          <p className="mt-1 text-sm text-slate-400">
            {quantity} • <span className="capitalize">{category}</span>
          </p>
        </div>

        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 border border-slate-700">
          {category}
        </span>
      </div>
    </li>
  );
}