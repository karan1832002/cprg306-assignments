import Link from "next/link";

export default function StudentInfo() {
  return (
    <div>
      <p>Name: Karandeep Singh</p>
      <p>
        GitHub:{" "}
        <Link href="https://github.com/karan1832002/cprg306-assignments">
          https://github.com/karan1832002/cprg306-assignments
        </Link>
      </p>
    </div>
  );
}
