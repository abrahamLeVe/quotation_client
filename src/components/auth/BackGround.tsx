import Image from "next/image";
import background from "../../../public/auth.webp";

export default function BackGround() {
  return (
    <>
      <Image
        src={background}
        alt="auth"
        placeholder="blur"
        sizes="100vw"
        priority
        className="object-cover w-full"
      />
    </>
  );
}
