"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type SortMode = "name" | "category" | "grouped";

export default function ItemList() {
  const [sortBy, setSortBy] = useState<SortMode>("name");
  const items = itemsData as ItemType[];

  const buttonClass = (mode: SortMode) =>
    `px-4 py-2 rounded-md border border-white text-sm font-semibold transition
     ${
       sortBy === mode
         ? "bg-white text-black"
         : "bg-black text-white hover:bg-white hover:text-black"
     }`;

  if (sortBy === "grouped") {
    const grouped = items.reduce<Record<string, ItemType[]>>((acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    }, {});

    return (
      <section className="space-y-6">
        <div className="flex justify-center gap-3">
          <button onClick={() => setSortBy("name")} className={buttonClass("name")}>
            Name
          </button>
          <button onClick={() => setSortBy("category")} className={buttonClass("category")}>
            Category
          </button>
          <button onClick={() => setSortBy("grouped")} className={buttonClass("grouped")}>
            Group
          </button>
        </div>

        {Object.keys(grouped)
          .sort()
          .map((cat) => (
            <div key={cat} className="space-y-3">
              <h2 className="text-center text-lg font-bold capitalize text-white">
                {cat}
              </h2>
              <ul className="space-y-3">
                {grouped[cat]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item key={item.id} {...item} />
                  ))}
              </ul>
            </div>
          ))}
      </section>
    );
  }

  items.sort((a, b) =>
    sortBy === "name"
      ? a.name.localeCompare(b.name)
      : a.category.localeCompare(b.category)
  );

  return (
    <section className="space-y-6">
      <div className="flex justify-center gap-3">
        <button onClick={() => setSortBy("name")} className={buttonClass("name")}>
          Name
        </button>
        <button onClick={() => setSortBy("category")} className={buttonClass("category")}>
          Category
        </button>
        <button onClick={() => setSortBy("grouped")} className={buttonClass("grouped")}>
          Group
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
