import type { ShoppingItem } from "../_services/shopping-list-service";

type ItemListProps = {
  items: ShoppingItem[];
  onDeleteItem: (itemId: string) => void | Promise<void>;
};

export default function ItemList({ items, onDeleteItem }: ItemListProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Your Items</h2>
        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-200">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/30 p-8 text-center text-slate-300">
          No items yet. Add your first shopping item.
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold capitalize">{item.name}</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                      Quantity: {item.quantity}
                    </span>
                    <span className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-200 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}