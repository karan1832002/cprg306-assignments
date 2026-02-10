import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Shopping List
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                        dark:border-slate-700 dark:bg-slate-800">
          <ItemList />
        </div>
      </div>
    </main>
  );
}
