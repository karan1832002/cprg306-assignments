"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import { useUserAuth } from "../_utils/auth-context";
import {
  getItems,
  addItem,
  deleteItem,
  type ShoppingItem,
  type NewShoppingItem,
} from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);

  async function loadItems() {
    if (!user) return;
    const userItems = await getItems(user.uid);
    setItems(userItems);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  async function handleAddItem(item: NewShoppingItem) {
    if (!user) return;
    const id = await addItem(user.uid, item);
    setItems((prev) => [...prev, { id, ...item }]);
  }

  async function handleDeleteItem(itemId: string) {
    if (!user) return;
    await deleteItem(user.uid, itemId);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <p className="mb-4 text-lg">Please log in to view your shopping list.</p>
          <Link
            href="/week-10"
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200">
              Week 10
            </p>
            <h1 className="text-4xl font-bold">Shopping List</h1>
          </div>

          <Link
            href="/week-10"
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Back
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onDeleteItem={handleDeleteItem} />
        </div>
      </div>
    </main>
  );
}