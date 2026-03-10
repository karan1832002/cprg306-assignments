"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

function cleanIngredientName(text: string): string {
  let cleaned = text.split(",")[0].trim();

  cleaned = cleaned
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.split(" ")[0] ?? "";
}

export default function Page() {
  const { user, loading } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState<ItemType[]>(
    itemsData as unknown as ItemType[]
  );
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      alert("Please log in first to access the shopping list.");
      router.replace("/week-8");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  function handleAddItem(item: ItemType) {
    setItems((prev) => [...prev, item]);
  }

  function handleItemSelect(item: ItemType) {
    setSelectedItemName(cleanIngredientName(item.name));
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-100">Shopping List</h1>

      <div className="flex flex-col gap-8 md:flex-row">
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