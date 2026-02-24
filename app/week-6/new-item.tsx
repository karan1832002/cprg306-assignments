"use client";

import { useState } from "react";
import type { ItemType } from "./page";

type NewItemProps = {
  onAddItem: (item: ItemType) => void;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState<string>("produce");

  const [nameError, setNameError] = useState<string>("");

  const inputBase =
    "w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-100 " +
    "placeholder:text-slate-500 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();

    if (trimmed.length < 2) {
      if (trimmed.length === 1) setNameError("Name must be at least 2 characters");
      return;
    }

    const item: ItemType = {
      name: trimmed,
      quantity,
      category,
    };

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameError("");
  }

  const trimmedName = name.trim();
  const isNameValid = trimmedName.length >= 2;
  const isFormValid = isNameValid && quantity >= 1 && quantity <= 99 && category.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="text-sm text-slate-300">Item name</label>
        <input
          className={`${inputBase} mt-1 ${nameError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);

            const t = value.trim();

            if (t.length === 1) setNameError("Name must be at least 2 characters");
            else setNameError("");
          }}
          placeholder="e.g., Apples"
        />

        {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
      </div>

  
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-slate-300">Quantity</label>
          <input
            className={`${inputBase} mt-1`}
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <p className="mt-1 text-xs text-slate-500">Must be between 1 and 99</p>
        </div>

        <div>
          <label className="text-sm text-slate-300">Category</label>
          <select
            className={`${inputBase} mt-1`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="produce">produce</option>
            <option value="dairy">dairy</option>
            <option value="bakery">bakery</option>
            <option value="meat">meat</option>
            <option value="frozen">frozen</option>
            <option value="canned goods">canned goods</option>
            <option value="dry goods">dry goods</option>
            <option value="beverages">beverages</option>
            <option value="snacks">snacks</option>
            <option value="household">household</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded-xl px-4 py-2.5 font-semibold transition
          ${
            isFormValid
              ? "bg-sky-600 text-white hover:bg-sky-500 active:scale-[0.99]"
              : "bg-slate-700/40 text-slate-400 cursor-not-allowed"
          }`}
      >
        {isFormValid ? "Add Item" : "Fill required fields"}
      </button>
    </form>
  );
}