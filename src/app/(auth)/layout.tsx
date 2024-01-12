"use client";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div
          className="relative hidden h-full w-full bg-muted lg:flex dark:border-r"
          style={{
            backgroundImage: `url(./auth.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <main>{children}</main>
      </div>
    </>
  );
}
