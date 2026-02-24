"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "../week-5/items.json";

export type ItemType = {
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(item: ItemType) {
    setItems((prev) => [...prev, item]);
  }

  return (
   <main className="h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
  <div className="mx-auto max-w-4xl px-4 py-10 h-full flex flex-col">
    <header className="mb-8 shrink-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Shopping List
          </h1>
          <p className="mt-2 text-slate-400">
            Add items and sort by name or category.
          </p>
        </header>

       <div className="grid gap-6 lg:grid-cols-[420px_1fr] items-start flex-1 min-h-0">
          <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-lg self-start">
            <h2 className="text-lg font-semibold mb-4">New Item</h2>
            <NewItem onAddItem={handleAddItem} />
          </section>

          <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-lg h-full min-h-0">
  <h2 className="text-lg font-semibold mb-4 shrink-0">Items</h2>

  <div className="flex-1 min-h-0 overflow-y-auto pr-2">
    <ItemList items={items} />
  </div>
</section>
        </div>
      </div>
    </main>
  );
}