"use client";

import { useEffect, useMemo, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealIdeasProps = {
  ingredient: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) return [];
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data: { meals: Meal[] | null } = await res.json();
  return data.meals ?? [];
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      setLoading(true);
      try {
        const results = await fetchMealIdeas(ingredient);
        if (!cancelled) setMeals(results);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [ingredient]);

  const title = useMemo(() => {
    if (!ingredient) return "Meal Ideas";
    return `Meal Ideas for "${ingredient}"`;
  }, [ingredient]);

  return (
  <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
    <h2 className="text-xl font-semibold text-slate-100 mb-4">
      Meal Ideas
    </h2>

    {!ingredient ? (
      <p className="text-sm text-slate-400">
        Select an item to see meal ideas.
      </p>
    ) : meals.length === 0 ? (
      <p className="text-sm text-slate-400">
        No meals found.
      </p>
    ) : (
      <ul className="space-y-2">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 cursor-default"
          >
            {meal.strMeal}
          </li>
        ))}
      </ul>
    )}
  </section>
);
}