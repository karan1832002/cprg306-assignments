import Image from "next/image";
const NicePictures = () => {
  return (
    <>
      <p>Nice Pictures</p>
      <Image
        className="dark:invert rounded-2xl shadow-lg border border-red-500"
        src="/teddy_bear.jpg"
        alt="Next.js logo"
        width={200}
        height={200}
        priority
      />
    </>
  );
};

export default NicePictures;
