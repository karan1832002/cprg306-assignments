import Image from "next/image";
import Header from "../components/header";
import { returnUserDetails } from "@/util/simulate_api";
import DisplayUserDetails from "@/components/displayUserDetails";

import Link from "next/link";

export default function Home() {
  const capitalizer = (str: string) => {
    return str.toUpperCase();
  };
  return (
    <div className="flex min-h-screen items-center justify-start flex-col bg-gray-50 font-sans dark:bg-black w-full">
      <Header />
      <div className=" w-full p-2 px-4">
        <DisplayUserDetails
          name="Felix"
          appelation="Mr."
          capitalizer={capitalizer}
        />
      </div>

      <div className="py-12 bg-gray-100">
        <Image
          className="dark:invert rounded-2xl shadow-lg border border-red-500"
          src="/teddy_bear.jpg"
          alt="Next.js logo"
          width={200}
          height={200}
          priority
        />
      </div>
      <div className="italic text-blue-500 text-3xl">
        <nav>
          <Link href="/bowlerhat">Bowlerhat Page</Link>
        </nav>
      </div>
    </div>
  );
}
