interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="bg-gray-800 text-white p-3 m-2 rounded shadow">
      <p className="font-bold">{name}</p>
      <p>Quantity: {quantity}</p>
      <p className="text-sm text-gray-300">Category: {category}</p>
    </li>
  );
}
