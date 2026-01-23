import NicePictures from "@/components/nice_pictures";
import Link from "next/link";
import { returnUserName } from "@/util/simulate_api";
export default function BowlerhatPage() {
  return (
    <div>
      Bowlerhat Page
      <NicePictures />
      <div>Welcome {returnUserName()}</div>
      <Link href="/">Go Back Home</Link>
    </div>
  );
}
