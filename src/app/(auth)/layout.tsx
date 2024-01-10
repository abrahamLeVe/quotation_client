export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden w-full h-full bg-muted lg:flex dark:border-r">
          <img
            src="./auth.webp"
            className="w-full object-cover"
            alt="auth"
            loading="eager"
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
