"use client";

import { useState } from "react";
import type { NewShoppingItem } from "../_services/shopping-list-service";

type NewItemProps = {
  onAddItem: (item: NewShoppingItem) => void | Promise<void>;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameError, setNameError] = useState("");

  function increment() {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 1) {
      setNameError("Item name is required.");
      return;
    }

    setNameError("");

    const newItem: NewShoppingItem = {
      name: trimmedName,
      quantity,
      category,
    };

    await onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
      <h2 className="mb-5 text-2xl font-semibold">Add New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="item-name" className="mb-2 block text-sm text-slate-200">
            Item Name
          </label>
          <input
            id="item-name"
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
          />
          {nameError && <p className="mt-2 text-sm text-rose-300">{nameError}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-200">Quantity</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrement}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-xl font-bold text-white transition hover:bg-slate-700"
            >
              -
            </button>

            <div className="min-w-[72px] rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-center text-lg font-semibold">
              {quantity}
            </div>

            <button
              type="button"
              onClick={increment}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-xl font-bold text-white transition hover:bg-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="item-category" className="mb-2 block text-sm text-slate-200">
            Category
          </label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Add Item
        </button>
      </form>
    </section>
  );
}