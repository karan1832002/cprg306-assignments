import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-zinc-100 text-gray-700 p-2 w-full flex flex-row items-center justify-between border border-b-2 border-zinc-300">
      <div className="flex flex-row items-center justify-center pr-2 gap-2">
        <Image
          className="dark:invert rounded-2xl shadow-lg border-2 border-[#e6ac0e] "
          src="/teddy_bear.jpg"
          alt="Next.js logo"
          width={70}
          height={70}
          priority
        />
        <p className="italic font-bold text-2xl text-[#e6ac0e]">Teddy Shop</p>
      </div>
      <nav className="flex gap-6 text-[#e6ac0e] font-semibold text-md">
        <Link href="/" className="hover:text-green-300">
          Home
        </Link>
        <Link href="/details" className="hover:text-green-300">
          Details
        </Link>
        <Link href="/pay" className="hover:text-green-300">
          Pay
        </Link>
      </nav>
    </header>
  );
}
