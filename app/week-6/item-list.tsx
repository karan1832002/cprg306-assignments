"use client";

import { useMemo, useState } from "react";
import Item from "../week-5/item";
import type { ItemType } from "./page";

type ItemListProps = {
  items: ItemType[];
};

type SortBy = "name" | "category" | "group";

function titleCase(text: string) {
  return text
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // Sort items for Name/Category (and also used before grouping)
  const sortedItems = useMemo(() => {
    const copy = [...items];

    copy.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      if (sortBy === "name") {
        return aName.localeCompare(bName);
      }

      if (sortBy === "category" || sortBy === "group") {
        const aCat = a.category.toLowerCase();
        const bCat = b.category.toLowerCase();

        const catCompare = aCat.localeCompare(bCat);
        if (catCompare !== 0) return catCompare;

        // tie-breaker inside category/group
        return aName.localeCompare(bName);
      }

      return 0;
    });

    return copy;
  }, [items, sortBy]);

  // Your existing pill styling
  const pill = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm border transition
     ${
       active
         ? "bg-slate-100 text-slate-900 border-slate-100"
         : "bg-transparent text-slate-200 border-slate-700 hover:border-slate-500"
     }`;

  // Build grouped object when in "group" mode
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, ItemType[]> = {};

    for (const item of sortedItems) {
      const key = item.category; // group by category
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }

    return groups;
  }, [sortedItems]);

  return (
    <div>
      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-slate-300">Sort by:</span>

        <button
          type="button"
          className={pill(sortBy === "name")}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>

        <button
          type="button"
          className={pill(sortBy === "category")}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>

        <button
          type="button"
          className={pill(sortBy === "group")}
          onClick={() => setSortBy("group")}
        >
          Group
        </button>

        <div className="ml-auto text-xs text-slate-500">
          {sortedItems.length} item{sortedItems.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Normal list for Name/Category */}
      {sortBy !== "group" && (
        <ul className="space-y-3">
          {sortedItems.map((item, index) => (
            <Item
              key={`${item.name}-${item.category}-${item.quantity}-${index}`}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* Grouped view (headings + items) */}
      {sortBy === "group" && (
        <div className="space-y-8">
          {Object.entries(groupedByCategory)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, groupItems]) => (
              <div key={category}>
                {/* Group Heading */}
                <h3 className="text-2xl font-semibold text-center mb-4">
                  {titleCase(category)}
                </h3>

                {/* Items under heading */}
                <ul className="space-y-3">
                  {groupItems.map((item, index) => (
                    <Item
                      key={`${item.name}-${category}-${index}`}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}