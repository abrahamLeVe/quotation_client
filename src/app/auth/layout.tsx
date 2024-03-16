import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { Suspense } from "react";
import background from "../../../public/auth.webp";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full w-full lg:flex dark:border-r">
        <Image
          priority={true}
          src={background}
          alt="auth"
          placeholder="blur"
          sizes="100vw"
          className="object-cover w-full"
        />
      </div>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <main>
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}
