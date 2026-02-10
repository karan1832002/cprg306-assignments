export default function Item({
  name,
  quantity,
  category,
}: {
  name: string;
  quantity: number;
  category: string;
}) {
  return (
    <li className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center
                   text-gray-900 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {quantity} • <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}
