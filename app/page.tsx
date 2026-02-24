import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>

      <Link href="/week-2">Week 2 Assignment</Link>
      <br />
      <Link href="/week-3">Week 3 Shopping List</Link>
      <br />
      <Link href="week-4">Week 4 To-Do List</Link>
      <br />
      <Link href="/week-5">Week 5 Sorting function</Link>
      <br />
      <Link href="/week-6">Week 6 w4+w5 </Link>
    </main>
  );

}
