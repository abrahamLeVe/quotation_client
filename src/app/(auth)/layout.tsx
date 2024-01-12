import Image from "next/image";
import background from "../../../public/auth.webp";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full w-full bg-muted lg:flex dark:border-r">
          <Image
            priority={true}
            src={background}
            alt="auth"
            placeholder="blur"
            sizes="100vw"
            className="object-cover w-full"
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
