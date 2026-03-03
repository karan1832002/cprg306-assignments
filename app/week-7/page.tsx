"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "../week-5/items.json";

export type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

function cleanIngredientName(text: string): string {
  let cleaned = text.split(",")[0].trim();

  cleaned = cleaned.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|�[�-�]|�[�-�]|[\u2011-\u26FF]|�[�-�])/g,
    ""
  );

  cleaned = cleaned
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.split(" ")[0] ?? "";
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(
    itemsData as unknown as ItemType[]
  );
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  function handleAddItem(item: ItemType) {
    setItems((prev) => [...prev, item]);
  }

  function handleItemSelect(item: ItemType) {
    setSelectedItemName(cleanIngredientName(item.name));
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-100">
        Shopping List
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}