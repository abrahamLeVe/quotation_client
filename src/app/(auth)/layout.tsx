import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden w-full h-full bg-muted lg:flex dark:border-r">
          <Image
            src="/auth.webp"
            className="w-full object-cover"
            alt="auth"
            width={2732}
            height={2532}
            priority
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
